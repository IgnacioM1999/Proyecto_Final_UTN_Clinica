import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

export interface Pasante {
dniPasante: string; 
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

  constructor(private http: HttpClient){}
  
    // Crear un nuevo pasante
    createPasante(data: {usuario: Usuario, pasante: Pasante}): Observable<any> {
      return this.http.post<any>(this.apiUrl, data);
    }
}
