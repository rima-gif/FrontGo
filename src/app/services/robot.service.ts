import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Robot } from '../models/robot.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private robotUrl  = 'http://localhost:8080/robots';

  constructor(private http: HttpClient,private authService:AuthService) {}

 // 🔹 Ajouter un robot (SUPER_ADMIN uniquement)
 addRobot(robotData: any): Observable<any> {
  if (!this.authService.isSuperAdmin()) {
    return throwError(() => new Error("Accès refusé. Seul le Super Admin peut ajouter un robot."));
  }
  return this.http.post(`${this.robotUrl}/add`, robotData, this.getAuthHeaders()).pipe(
    catchError(this.handleError) // ✅ Gestion des erreurs ajoutée
  );
}

// 🔹 Supprimer un robot par ID (SUPER_ADMIN uniquement)
deleteRobot(robotId: number): Observable<any> {
  if (!this.authService.isSuperAdmin()) {
    return throwError(() => new Error("Accès refusé. Seul le Super Admin peut supprimer un robot."));
  }
  return this.http.delete(`${this.robotUrl}/delete/${robotId}`, this.getAuthHeaders()).pipe(
    catchError(this.handleError) // ✅ Gestion des erreurs ajoutée
  );
}

// 🔹 Mettre à jour un robot par ID (SUPER_ADMIN uniquement)
updateRobot(robotId: string, robot: Robot): Observable<Robot> {
  if (!this.authService.isSuperAdmin()) {
    return throwError(() => new Error('Accès refusé. Seul le Super Admin peut modifier un robot.'));
  }
  return this.http.put<Robot>(`${this.robotUrl}/update/${robotId}`, robot, this.getAuthHeaders()).pipe(
    catchError(this.handleError) // ✅ Gestion des erreurs ajoutée
  );
}
// 🔹 Récupérer tous les robots (accessible à tous)
getAllRobots(): Observable<any> {
  return this.http.get(`${this.robotUrl}/all`, this.getAuthHeaders()).pipe(
    catchError(this.handleError) // ✅ Gestion des erreurs ajoutée
  );
}

// ✅ Méthode pour inclure le token dans les requêtes
private getAuthHeaders() {
  const token = this.authService.getToken();
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  };
}

// ✅ Gestion des erreurs HTTP
private handleError(error: HttpErrorResponse) {
  let errorMsg = 'Une erreur est survenue';
  if (error.error && error.error.message) {
    errorMsg = error.error.message;
  }
  return throwError(() => new Error(errorMsg));
}
}