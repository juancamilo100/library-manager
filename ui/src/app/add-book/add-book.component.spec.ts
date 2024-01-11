import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AddBookComponent } from './add-book.component';
import { BookService } from '../services/book/book.service';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let bookService: jasmine.SpyObj<BookService>;

  beforeEach(() => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', ['addBook']);

    TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: BookService, useValue: bookServiceSpy }],
    });

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() when form is submitted with valid data', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    bookService.addBook.and.returnValue(of({}));

    component.bookForm.setValue({
      title: 'Sample Title',
      author: 'Sample Author',
      description: 'Sample Description',
      year: '2022',
    });

    component.onSubmit();

    expect(bookService.addBook).toHaveBeenCalledOnceWith({
      title: 'Sample Title',
      author: 'Sample Author',
      description: 'Sample Description',
      year: '2022',
    });

    expect(navigateSpy).toHaveBeenCalledOnceWith(['/']);
  });

  it('should not call onSubmit() when form is submitted with invalid data', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.bookForm.setValue({
      title: 'Sample Title',
      author: 'Sample Author',
      description: '', // Invalid data
      year: '2022',
    });

    component.onSubmit();

    expect(bookService.addBook).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
