import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `http://${env.baseUrl}/auth`;
  private authenticated = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.url}/login`, { username, password }).pipe(
      map((data: any) => {
        localStorage.setItem('username', username);
        localStorage.setItem('access_token', data.access_token);
        this.authenticated = true;
        console.log('Logged in successfully with access_token: ', data.access_token);
        return true;
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): any {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
