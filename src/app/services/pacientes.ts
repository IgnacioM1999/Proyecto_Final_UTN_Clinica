import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

export interface Paciente {
  dniPaciente: string;
  nombreYApellido?: string;
  telefono?: string;
  mail?: string;
  nombreUsuario?: string;
  contrasenia?: string;
  obraSocial: string;
  fechaNacimiento: string;
  sexo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesServices {

  private apiUrl = 'http://localhost:3000/pacientes'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  // Crear un nuevo paciente
  createPaciente(data: { usuario: Usuario, paciente: Paciente }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Eliminar pacientes
  deletePacientes(dni: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dni}`);
  }

  //Obtener todos los pacientes (solo con estado activo)
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl)
  }

  // Modificar especialistas (tabla USUARIOS y PACIENTES)
  updatePacientes(dni: string, data: { usuario: Usuario, paciente: Paciente }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dni}`, data);
  }

    //Obtener todos los pacientes
  getPacientesHistorialClinico(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}HistorialClinico`)
  }

}