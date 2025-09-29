import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que representa un especialista
export interface Especialista {
  dniEspecialista: string;
  horasSupervisor: number;
  titulos: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialistasServices {

  private apiUrl = 'http://localhost:3000/especialistas'; //URL que se usa en el backend
  
    constructor(private http: HttpClient){}
  
    //Obtener todos los especialistas
    getEspecialistas(): Observable<Especialista[]>{
      return this.http.get<Especialista[]>(this.apiUrl)
    }
    
    // Obtener un especialista por dni
    getTurno(dni: number): Observable<Especialista> {
      return this.http.get<Especialista>(`${this.apiUrl}/${dni}`);
    }
  
    // Crear un nuevo especialista
    createEspecialista(turno: Especialista): Observable<Especialista> {
      return this.http.post<Especialista>(this.apiUrl, turno);
    }
  
    // Modificar especialistas
    updateEspecialistas(dni: number, especialista: Especialista): Observable<Especialista> {
      return this.http.put<Especialista>(`${this.apiUrl}/${dni}`, especialista);
    }
  
    // Eliminar especialistas
    deleteEspecialistas(dni: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${dni}`);
    }
  
}