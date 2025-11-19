import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Antecedente {
  idAntecedentes: number;
  tipoAntecedente: string;
  descripcion: string;
  dniPaciente: string;
}

@Injectable({
  providedIn: 'root'
})

export class AntecedentesServices {

  private apiUrl = 'http://localhost:3000/antecedentes'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }
  getAntecedentesPorPaciente(dniPaciente: string): Observable<Antecedente[]> {
    console.log('Se llego al llamado del getAntecedentesPorPaciente y el dniPaciente es:',dniPaciente);
    return this.http.get<Antecedente[]>(`${this.apiUrl}/${dniPaciente}`);
  }

  createAntecedente(antecedente: any): Observable<any> {
    return this.http.post(this.apiUrl, antecedente);
}


}
