import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RadioFrequencyService {
  private radioFrequencyUrl = 'http://localhost:8080/radio-frequency';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // 🔹 Récupérer tous les UIDs
  getAllFrequencies(): Observable<any> {
    return this.http.get(`${this.radioFrequencyUrl}/all`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 Ajouter un UID (SUPER_ADMIN uniquement)
  addUID(uid: string): Observable<any> {
    if (!this.authService.isSuperAdmin()) {
      return throwError(() => new Error("Accès refusé: Seul un Super Admin peut ajouter un UID."));
    }
    return this.http.post(`${this.radioFrequencyUrl}/Add`, { uid }, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 Mettre à jour un UID par ID (SUPER_ADMIN uniquement)
  updateUID(id: number, uid: string): Observable<any> {
    if (!this.authService.isSuperAdmin()) {
      return throwError(() => new Error('Accès refusé: Seul un Super Admin peut modifier un UID.'));
    }
    return this.http.put(`${this.radioFrequencyUrl}/update/${id}`, { uid }, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 Supprimer un UID par ID (SUPER_ADMIN uniquement)
  deleteUID(id: number): Observable<any> {
    if (!this.authService.isSuperAdmin()) {
      return throwError(() => new Error('Accès refusé: Seul un Super Admin peut supprimer un UID'));
    }
    return this.http.delete(`${this.radioFrequencyUrl}/delete/${id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Obtenir les en-têtes d'authentification
  private getAuthHeaders() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // 🔹 Gestion des erreurs HTTP
  private handleError(error: any) {
    let errorMsg = 'Une erreur est survenue';
    if (error.error && error.error.message) {
      errorMsg = error.error.message;
    }
    return throwError(() => new Error(errorMsg));
  }
}