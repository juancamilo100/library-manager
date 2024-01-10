import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = `http://${env.baseUrl}/books`;

  constructor(private http: HttpClient) { }

  getBooks(page: number, pageSize: number): Observable<{count: number, books: Book[]}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.url, { params });
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.url, book);
  }

  updateBook(book: Book): Observable<any> {
    const url = `${this.url}/${book.id}`;
    return this.http.put<any>(url, book);
  }

  deleteBook(bookId: string): Observable<any> {
    const url = `${this.url}/${bookId}`;
    return this.http.delete<any>(url);
  }
}
