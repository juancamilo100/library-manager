import { Component } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BookService } from '../services/book.service';
import { Book } from '../services/book.model';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  envVar: string = env.baseUrl;
  books: Book[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks(this.currentPage, 10).subscribe((data: Book[]) => {
      console.log(data);
      this.books = data;
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
}
