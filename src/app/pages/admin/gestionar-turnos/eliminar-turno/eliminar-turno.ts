import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Turno, TurnosServices } from '../../../../services/turnos';

@Component({
  selector: 'app-eliminar-turno',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './eliminar-turno.html',
  styleUrl: './eliminar-turno.css'
})
export class EliminarTurno implements OnInit {

  /*turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Dra. Gómez' },
    { id: 3, dia: 'Viernes', hora: '14:00', especialista: 'Dr. López' }
    ];*/

  turnos: Turno[] = []

  constructor(private turnosServices: TurnosServices) { }

    ngOnInit(): void {
    this.cargarTurnos();
  }

  //Cargar turnos desde el backend
  cargarTurnos(): void {
    this.turnosServices.getEspecialistasYPacientes().subscribe({
      next: (data) => this.turnos = data,
      error: (err) => console.error('Error al cargar turnos:', err)
    });
  }

  eliminarTurno(id: number) {
    if (confirm('¿Seguro que deseas eliminar este turno?')) {
      this.turnos = this.turnos.filter(t => t.idTurno !== id); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
      //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
