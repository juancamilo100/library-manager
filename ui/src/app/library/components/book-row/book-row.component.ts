import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Book } from 'src/app/services/book.model';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css'],
})
export class BookRowComponent {
  @Input() book: Book;
  @Output() saveEvent = new EventEmitter<Book>();
  @Output() deleteEvent = new EventEmitter<{id: string}>();

  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('authorInput') authorInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;
  @ViewChild('yearInput') yearInput: ElementRef;

  faPenToSquare = faPenToSquare
  faXmark = faXmark
  faCheck = faCheck
  faTrash = faTrash
  editing: boolean = false;

  onEdit() {
    console.log('Editing...');
    this.editing = !this.editing;
  }

  onSave() {
    const title = this.titleInput.nativeElement.value;
    const author = this.authorInput.nativeElement.value;
    const description = this.descriptionInput.nativeElement.value;
    const year = this.yearInput.nativeElement.value;
    console.log('Saving...');
    console.log(title);
    console.log(author);
    console.log(description);
    console.log(year);

    const updatedBook = {
      id: this.book.id,
      title,
      author,
      description,
      year
    } as Book
    this.saveEvent.emit(updatedBook);
    this.editing = false;
  }

  onDelete() {
    console.log('Deleting...');
    console.log("id: ", this.book)
    this.deleteEvent.emit(this.book);
  }
}
