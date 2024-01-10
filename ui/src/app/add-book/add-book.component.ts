// add-book.component.ts

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../services/book/book.service';
import { Book } from '../services/book/book.model';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {

      const newBook = {
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        description: this.bookForm.value.description,
        year: this.bookForm.value.year,
      } as Book;

      this.bookService.addBook(newBook).subscribe((data) => {
        this.router.navigate(['/']);
      });
    }
  }
}
