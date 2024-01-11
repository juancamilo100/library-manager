import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { environment } from '../../../environments/environment';
import { Book } from './book.model';

describe('BookService', () => {
  let injector: TestBed;
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    injector = getTestBed();
    service = injector.inject(BookService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books with count when getBooks is called', () => {
    const mockBooksResponse = { count: 10, books: [] };
    const page = 1;
    const pageSize = 10;

    service.getBooks(page, pageSize).subscribe((data) => {
      expect(data).toEqual(mockBooksResponse);
    });

    const req = httpMock.expectOne(`http://${environment.baseUrl}/books?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooksResponse);
  });

  it('should add a book when addBook is called', () => {
    const mockBook = { title: 'Test Book', author: 'Test Author' };

    service.addBook(mockBook).subscribe((data) => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`http://${environment.baseUrl}/books`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a book when updateBook is called', () => {
    const mockBook: Book = { id: '1', title: 'Test Book', author: 'Test Author', description: 'Test Description', year: 2021 };

    service.updateBook(mockBook).subscribe((data) => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`http://${environment.baseUrl}/books/${mockBook.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a book when deleteBook is called', () => {
    const bookId = '1';

    service.deleteBook(bookId).subscribe((data) => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`http://${environment.baseUrl}/books/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
