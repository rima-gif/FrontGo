import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl  = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
    // Méthode signup
    signup(user: any) {
      return this.http.post(`${this.baseUrl}/auth/signup`, user); // Correct URL
    }
    
}

