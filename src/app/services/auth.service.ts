import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/signup`, user, {
      headers,
      withCredentials: true,  // ✅ Important pour envoyer les cookies
      responseType: 'json'    // ✅ Assure que la réponse est bien interprétée en JSON
    });
  }
}
