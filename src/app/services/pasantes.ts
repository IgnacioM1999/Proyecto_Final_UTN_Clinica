import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

export interface Pasante {
  dniPasante: string;
  nombreYApellido?: string;
  telefono?: string;
  mail?: string;
  nombreUsuario?: string;
  contrasenia?: string;
  horasPasante: number;
  institucion: string;
  mesInicio: string;
  anioInicio: number;
  docente: string;
  mailDocente: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasantesServices {

  private apiUrl = 'http://localhost:3000/pasantes'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  // Crear un nuevo pasante
  createPasante(data: { usuario: Usuario, pasante: Pasante }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Eliminar pasantes
  deletePasantes(dni: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dni}`);
  }

  //Obtener todos los pasantes
  getPasantes(): Observable<Pasante[]> {
    return this.http.get<Pasante[]>(this.apiUrl)
  }

  // Modificar pasantes (tabla USUARIOS y PASANTES)
  updatePasantes(dni: string, data: { usuario: Usuario, pasante: Pasante }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dni}`, data);
  }

  //Actualizar las horas de pasante.
  //Este metodo se invoca en el proceso de registrar-sesion en el menu del especialista
  actualizarHorasPasante(dni: string, horasExtra: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dni}/horasPasante`, { horasExtra });
  }

  //Obtener a un pasante por el dni
  //Este metodo se usa en Ver Estado del menu Pasante
  getPasante(dniPasante: string): Observable<Pasante> {
    return this.http.get<Pasante>(`${this.apiUrl}/${dniPasante}`);
  }

}
