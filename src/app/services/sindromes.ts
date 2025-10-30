import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para hacer las solicitudes del servidor
import { Observable } from 'rxjs';

//Interfaz que representa un 
export interface Sindrome {
  idSindrome: number;
  descripcion: string;
  coincidencia?: number;
  porcentajeCoincidencia?:number;
}

@Injectable({
  providedIn: 'root'
})
export class SindromesServices {

  private apiUrl = 'http://localhost:3000/sindromes'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener Sindromes segun la lista de sintomas enviadas
  getSindromesPorSintomas(idsSintomas: number[]): Observable<Sindrome[]> {
    return this.http.post<Sindrome[]>(`${this.apiUrl}/sintomas`, { idsSintomas });
  }

}
