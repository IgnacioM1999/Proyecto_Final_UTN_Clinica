import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz que representa un especialista
export interface Sesion {
  idSesion: number;
  fecha: string;
  horaInicio: string;
  minutosAgujasPuestas: number;
  cantidadAgujasUsadas: number;
  idSindrome: number;
  descripcionSindrome: string;
  dniPaciente: string;
  nombreYApellidoPaciente: string;
  dniEspecialista: string;
  nombreYApellidoEspecialista: string;
  idTratamiento: number;
  descripcionTratamiento: string;
  descripcionSintoma?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SesionesServices {
  private apiUrl = 'http://localhost:3000/sesiones'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener todas las sesiones
  getSesiones(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(this.apiUrl)
  }

  // Obtener una sesion por id
  getSesion(id: number): Observable<Sesion> {
    return this.http.get<Sesion>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva sesion
  createSesion(sesion: Sesion): Observable<Sesion> {
    return this.http.post<Sesion>(this.apiUrl, sesion);
  }

  // Modificar sesiones
  updateSesiones(id: number, sesion: Sesion): Observable<Sesion> {
    return this.http.put<Sesion>(`${this.apiUrl}/${id}`, sesion);
  }

  // Eliminar sesiones
  deleteSesiones(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSesionesConNombres(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/listadoSesiones`);
  }

  getSesionesPaciente(dni: string): Observable<Sesion[]>{
    return this.http.get<Sesion[]>(`${this.apiUrl}/dniPaciente/${dni}`)
  }

  getSesionSintomas(id: number): Observable<Sesion[]>{
    return this.http.get<Sesion[]>(`${this.apiUrl}/${id}`)
  }

}
