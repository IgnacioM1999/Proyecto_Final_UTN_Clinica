import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuariosServices } from './usuarios';

// Interfaz que representa un especialista
export interface Especialista {
  dniEspecialista: string;
  nombreYApellido?: string;
  telefono?: string;
  mail?: string;
  nombreUsuario?: string;
  contrasenia?: string;
  horasSupervisor: number;
  titulos: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialistasServices {

  private apiUrl = 'http://localhost:3000/especialistas'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener todos los especialistas
  getEspecialistas(): Observable<Especialista[]> {
    return this.http.get<Especialista[]>(this.apiUrl)
  }

  // Obtener un especialista por dni
  getEspecialista(dni: string): Observable<Especialista> {
    return this.http.get<Especialista>(`${this.apiUrl}/${dni}`);
  }

  // Crear un nuevo especialista
  createEspecialista(data: { usuario: Usuario, especialista: Especialista }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Modificar especialistas (tabla USUARIOS y ESPECIALISTAS)
  updateEspecialistas(dni: string, data: { usuario: Usuario, especialista: Especialista }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dni}`, data);
  }

  // Eliminar especialistas
  deleteEspecialistas(dni: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dni}`);
  }

}