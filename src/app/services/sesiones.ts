import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz que representa un especialista
export interface Sesion {
  idSesion: number;
  fecha: string;
  horaInicio: string;
  descripcionSesion?: string;
  idSindrome: number;
  descripcionSindrome?: string;
  dniPaciente: string;
  nombreYApellidoPaciente?: string;
  dniEspecialista: string;
  nombreYApellidoEspecialista?: string;
  idTratamiento: number;
  descripcionTratamiento?: string;
  descripcionSintoma?: string;
  observacionesSesion?: string;
  duracionSesion?: string;
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

  // Crear una nueva sesion. Este metodo se usa en la opcion Registrar-Sesion en el menu del Especialista
  createSesion(sesion: Sesion): Observable<Sesion> {
    return this.http.post<Sesion>(this.apiUrl, sesion);
  }

  // Registrar síntomas asociados a una sesión 
  createSintomasSesion(idSesion: number, sintomas: any[]): Observable<any> {
    const payload = { idSesion, sintomas };
    return this.http.post<any>(`${this.apiUrl}/sintomas`, payload);
  }

  // Registrar insumos asociados a una sesión
  createInsumosSesion(idSesion: number, insumos: any[]): Observable<any> {
    const payload = { idSesion, insumos };
    return this.http.post<any>(`${this.apiUrl}/insumos`, payload);
  }



  // Modificar sesiones
  updateSesiones(id: number, sesion: Sesion): Observable<Sesion> {
    return this.http.put<Sesion>(`${this.apiUrl}/${id}`, sesion);
  }

  // Eliminar sesiones
  deleteSesiones(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Listar las sesiones para la opcion Listar-Sesiones del Administrador
  getSesionesConNombres(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/listadoSesiones`);
  }

  getSesionesPaciente(dni: string): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/dniPaciente/${dni}`)
  }

  //Es usando para la seccion del Historial CLinico cuando se selecciona una Sesion
  getSesionSintomas(id: number): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/${id}`)
  }

  // Registrar síntomas asociados a la sesion
  updateSesionSintomas(idSesion: number, sintomas: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-sintomas`, { idSesion, sintomas });
  }

  //Registrar antecedentes
  updateAntecedentes(antecedentes: any[], dniPaciente: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-antecedentes`, { antecedentes, dniPaciente });
  }

  //Registrar insumos usados
  updateInsumos(idSesion: number, insumos: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-insumos`, { idSesion, insumos });
  }

  //Actualizar horas de pasantes
  updateHorasPasantes(pasantes: string[], duracion: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-horas-pasantes`, { pasantes, duracion });
  }

  //Actualizar turno a ocupado
  updateEstadoTurno(idTurno: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-estado-turno`, { idTurno });
  }

  //Registrar todo el proceso completo (llama a los otros pasos en el backend)
  updateSesionCompleta(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-completo`, data);
  }

}
