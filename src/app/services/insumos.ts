import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para hacer las solicitudes del servidor
import { Observable } from 'rxjs';

// Interfaz que representa un insumo
export interface Insumo {
  idInsumos: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsumosServices {

  private apiUrl = 'http://localhost:3000/insumos'; //URL que se usa en el backend

  constructor(private http: HttpClient){}

  //Obtener todos los insumos
  getInsumos(): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(this.apiUrl)
  }
  
  // Obtener un insumo por ID
  getInsumo(id: number): Observable<Insumo> {
    return this.http.get<Insumo>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo insumo
  createInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

  // Modificar un insumo
  updateInsumo(id: number, insumo: Insumo): Observable<Insumo> {
    return this.http.put<Insumo>(`${this.apiUrl}/${id}`, insumo);
  }

  // Eliminar un insumo
  deleteInsumo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
