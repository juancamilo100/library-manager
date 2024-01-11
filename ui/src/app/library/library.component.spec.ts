import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryComponent } from './library.component';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { BookService } from '../services/book/book.service';
import { Book } from '../services/book/book.model';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  // Mock AuthService
  const authServiceMock = {
    login: jasmine.createSpy('login'),
    logout: jasmine.createSpy('logout'),
    isAuthenticated: jasmine.createSpy('isAuthenticated'),
  };

  // Mock BookService
  const bookServiceMock = {
    getBooks: () => of({ count: 10, books: [] }),
    updateBook: (book: any) => of({}),
    deleteBook: (id: any) => of({}),
  };

  const mockBook = {
    id: '1',
    title: 'Mock Book',
    author: 'Mock Author',
    description: 'Mock Description',
    year: 2021,
  } as Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: BookService, useValue: bookServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadBooks when onSaveHandler is called', () => {
    spyOn(component, 'loadBooks');
    component.onSaveHandler(mockBook);
    expect(component.loadBooks).toHaveBeenCalled();
  });

  it('should call loadBooks when onDeleteHandler is called', () => {
    spyOn(component, 'loadBooks');

    component.onDeleteHandler(mockBook);
    expect(component.loadBooks).toHaveBeenCalled();
  });

  it('should call login method of AuthService when login is called', () => {
    const username = 'testuser';
    const password = 'testpassword';
    component.login(username, password);
    expect(authServiceMock.login).toHaveBeenCalledWith(username, password);
  });

  it('should call logout method of AuthService when logout is called', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
