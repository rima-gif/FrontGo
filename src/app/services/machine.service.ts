import { Injectable } from "@angular/core";
import {  HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable,throwError  } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Machine } from "../models/machine.model";
import { radioFrequency } from "../models/RadioFrequency.model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root',
})
export class MachineService{
    private machineUrl = 'http://localhost:8080/machines';


    constructor(private http:HttpClient,private authService:AuthService ){}

    addMachine(machineData:any):Observable<any>{
        if(!this.authService.isSuperAdmin()){
            return throwError(()=> new Error("Accès refusé. Seul le Super Admin peut ajouter une machine."));
        }
        return this.http.post(`${this.machineUrl}/create`, machineData, this.getAuthHeaders()).pipe(
            catchError(this.handleError)
          );
        }
    deleteMachine(machineId:number):Observable<any>{
        if(!this.authService.isSuperAdmin()){
            return throwError(() => new Error("Accès refusé. Seul le Super Admin peut supprimer une machine."));
        }
        return this.http.delete(`${this.machineUrl}/delete/${machineId}`, this.getAuthHeaders()).pipe(
          catchError(this.handleError)
        );
      }
      updateMachine(machineId: number, machineData: Machine): Observable<Machine> {
        if (!this.authService.isSuperAdmin()) {
          return throwError(() => new Error('Accès refusé. Seul le Super Admin peut modifier une machine.'));
        }
        return this.http.put<Machine>(`${this.machineUrl}/update/${machineId}`, machineData, this.getAuthHeaders()).pipe(
          catchError(this.handleError)
        );
      }
      getAllMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(`${this.machineUrl}/all`, this.getAuthHeaders()).pipe(
          catchError(this.handleError)
        );
      }
      private getAuthHeaders() {
        const token = this.authService.getToken();
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          })
        };
      }
    

      private handleError(error: HttpErrorResponse) {
        let errorMsg = 'Une erreur est survenue';
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        }
        return throwError(() => new Error(errorMsg));
      }

}