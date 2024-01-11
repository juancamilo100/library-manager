import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BookRowComponent } from './book-row.component';
import { Book } from 'src/app/services/book/book.model';
import { ElementRef } from '@angular/core';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRowComponent);
    component = fixture.componentInstance;
    component.book = {
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      year: 2022
    } as Book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit saveEvent with updated book details', () => {
    spyOn(component.saveEvent, 'emit');
    const saveButton = fixture.debugElement.nativeElement.querySelector('.save-button');
    saveButton.click();
    expect(component.saveEvent.emit).toHaveBeenCalledWith({
      id: '1',
      title: 'Updated Title',
      author: 'Updated Author',
      description: 'Updated Description',
      year: 2023
    } as Book);
  });

  it('should emit deleteEvent with the book to be deleted', () => {
    spyOn(component.deleteEvent, 'emit');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('.delete-button');
    deleteButton.click();
    expect(component.deleteEvent.emit).toHaveBeenCalledWith({
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      year: 2022
    } as Book);
  });

  it('should toggle editing flag onEdit', () => {
    component.editing = false;
    component.onEdit();
    expect(component.editing).toBeTruthy();
  });
});
