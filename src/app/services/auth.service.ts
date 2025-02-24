import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/signup', data, { headers: { 'Content-Type': 'application/json' } });
  }
  // Connexion
  signin(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/signin',  { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  }

