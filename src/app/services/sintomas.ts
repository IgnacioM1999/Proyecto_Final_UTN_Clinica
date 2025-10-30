import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para hacer las solicitudes del servidor
import { Observable } from 'rxjs';

// Interfaz que representa un sintoma
export interface Sintoma{
  idSintoma: number;
  nivelMolestia?:number;
  fechaInicioSintoma?:string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class SintomasServices {

  private apiUrl = 'http://localhost:3000/sintomas'; //URL que se usa en el backend

  constructor(private http: HttpClient){}

  //Obtener todos los sintoma
  getSintomas(): Observable<Sintoma[]>{
    return this.http.get<Sintoma[]>(this.apiUrl)
  }
  
  // Obtener un sintoma por ID
  getSintoma(id: number): Observable<Sintoma> {
    return this.http.get<Sintoma>(`${this.apiUrl}/${id}`);
  }
  
}