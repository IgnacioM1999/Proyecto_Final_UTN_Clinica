import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

export interface Paciente {
dniPaciente: string; 
obraSocial: string; 
fechaNacimiento: string; 
sexo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesServices {

  private apiUrl = 'http://localhost:3000/pacientes'; //URL que se usa en el backend

  constructor(private http: HttpClient){}
  
    // Crear un nuevo pasante
    createPaciente(data: {usuario: Usuario, paciente: Paciente}): Observable<any> {
      return this.http.post<any>(this.apiUrl, data);
    }
}