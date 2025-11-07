import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

// Interfaz que representa un turno
export interface Turno {
  idTurno: number;
  fecha: string; //asi es mas facil hacer la converison del formato de fecha a dd-mm-aaaa en el Angular
  horario: string;
  estado: string;
  dniEspecialista: string;
  nombreEspecialista: string;
  dniPaciente: string;
  nombrePaciente: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnosServices {

  private apiUrl = 'http://localhost:3000/turnos'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener todos los turnos
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl)
  }

  // Obtener un turno por ID
  getTurno(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo turno
  createTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  // Modificar un turnos
  updateTurnos(id: number, turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno);
  }

  // Eliminar un turnos
  deleteTurnos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Obtener todos los pacientes y especialistas (usuarios donde el tipoUsuario = "especialista" o "pacientes")
  //usado en modificar-turno
  getEspecialistasYPacientes(): Observable<Turno[]> {
    console.log('URL llamada:', `${this.apiUrl}`);
    return this.http.get<Turno[]>(`${this.apiUrl}`);
  }

  //Obtener turnos agendados con el especialista
  //usando en  registrar-sesion en el menu de Especialista
  getTurnosEsp(dniEspecialista: string): Observable<Turno[]> {
    console.log('URL llamada:', `${this.apiUrl}/${dniEspecialista}`);
    return this.http.get<Turno[]>(`${this.apiUrl}/${dniEspecialista}`);
  }

  //Actualiza el estado del turno a Concluido
  //Este metodo se usa cuando se registra una sesion en el menu del especialista
  actualizarEstadoTurno(idTurno: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idTurno}/estado`, { nuevoEstado });
  }

  //Listar todos los turnos con estado Disponible
  //Este metodo se usa para la opcion Ver Turnos del menu del Paciente
  getTurnosDisponibles(): Observable<Turno[]> {
    console.log('Se llego al servicio getTurnosDispobles')
    return this.http.get<Turno[]>(`${this.apiUrl}Disponibles`);
  }

  //Actualizar el turno al estado = 'Ocupado' y con el dni del Paciente
  agendarTurno(idTurno: number, nuevoEstado: string, dniPaciente: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idTurno}/estadoOcupado`, { nuevoEstado, dniPaciente });
  }

  getTurnosReservados(dniPaciente: string): Observable<Turno[]> {
    console.log('Se llego al servicio getTurnosReservados')
    return this.http.get<Turno[]>(`${this.apiUrl}ReservadosPaciente/${dniPaciente}`);
  }

}
