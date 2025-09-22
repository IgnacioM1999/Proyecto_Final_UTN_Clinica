import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

// Interfaz que representa un turno
export interface Turno {
  idTurno: number;
  fecha: string; //asi es mas facil hacer la converison del formato de fecha a dd-mm-aaaa en el Angular
  horario: string;
  estado: string;
  dniEspecialista: number;
  nombreEspecialista: string;
  dniPaciente: number;
  nombrePaciente: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnosServices {

  private apiUrl = 'http://localhost:3000/turnos'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener todos los turnos
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl)
  }

  // Obtener un turno por ID
  getTurno(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo turno
  createTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  // Modificar un turnos
  updateTurnos(id: number, turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno);
  }

  // Eliminar un turnos
  deleteTurnos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Obtener todos los pacientes y especialistas (usuarios donde el tipoUsuario = "especialista" o "pacientes")
  getEspecialistasYPacientes(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/especialistas-y-pacientes`);
  }

}
