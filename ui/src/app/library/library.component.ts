import { Component } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BookService } from '../services/book.service';
import { Book } from '../services/book.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  envVar: string = env.baseUrl;
  books: Book[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService
      .getBooks(this.currentPage, this.pageSize)
      .subscribe((data: { count: number; books: Book[] }) => {
        console.log(data);
        this.books = data.books;

        this.totalPages = Math.ceil( data.count / this.pageSize);
      });
  }

  onSaveHandler(book: Book) {
    console.log('Received save event with data:', book);
    this.bookService.updateBook(book).subscribe((data: any) => {
      console.log('Updated book successfully');
      this.loadBooks();
    });
  }

  onDeleteHandler(book: Book) {
    console.log('Received delete event with data:', book);
    this.bookService.deleteBook(book.id).subscribe((data) => {
      console.log('Deleted book successfully');
      this.loadBooks();
    });
  }

  onPageIncrease() {
    console.log('Increasing page');
    this.currentPage = this.currentPage + 1;
    this.loadBooks();
  }

  onPageDecrease() {
    this.currentPage = this.currentPage - 1;
    this.loadBooks();
  }
}
