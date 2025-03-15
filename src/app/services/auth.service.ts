import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL de ton backend

  constructor(private http: HttpClient, private router: Router) {}

  // Connexion (login)
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // Stocker le token et le rôle après connexion
  saveUserData(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role[0]); // Ex: "ROLE_SUPER_ADMIN"
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
   getUser(): any {
     return {
       role: localStorage.getItem('role'),
       token: localStorage.getItem('token')
     };
  }
 

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean { 
    return this.getToken() !== null;
  }

  // Vérifier si l'utilisateur est SUPER_ADMIN
  isSuperAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_SUPER_ADMIN';
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  // Inscription
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, { headers: { 'Content-Type': 'application/json' } });
  }
  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Mot de passe oublié
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Réinitialisation du mot de passe
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
