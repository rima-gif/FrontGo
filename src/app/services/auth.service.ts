import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl  = 'http://localhost:8080/auth'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, { headers: { 'Content-Type': 'application/json' } });
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`,  { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword, confirmPassword })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'Une erreur est survenue';
          if (error.error && error.error.error) {
            errorMsg = error.error.error; // Afficher le message d'erreur envoyé par le backend
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}
