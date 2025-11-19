import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para hacer las solicitudes del servidor
import { Observable } from 'rxjs';

//Interfaz que representa un 
export interface Tratamiento {
  idTratamiento: number;
  nombre: string;
  descripcion?: string;
  puntos?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TratamientosServices {

  private apiUrl = 'http://localhost:3000/tratamientos'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  // Obtener tratamientos por ID de un sindrome
  getTratamientos(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo tratamiento
  createTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.apiUrl, tratamiento);
  }

}
