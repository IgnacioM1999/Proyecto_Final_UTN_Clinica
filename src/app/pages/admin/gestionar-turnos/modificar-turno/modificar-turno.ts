import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Turno, TurnosServices } from '../../../../services/turnos';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-turno',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-turno.html',
  styleUrl: './modificar-turno.css'
})
export class ModificarTurno implements OnInit {
  /* turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Juan Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Lic. Ana Gómez' },
    { id: 3, dia: 'Miércoles', hora: '14:00', especialista: 'Dr. Carlos Rodríguez' }
  ];*/

  turnos: Turno[] = []
  especialistas: Usuario[] = []

  constructor(private turnosServices: TurnosServices, private especialistasServices: EspecialistasServices, private usuariosServices: UsuariosServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
    this.cargarEspecialistas();
  }

  //Cargar turnos desde el backend
  cargarTurnos(): void {
    this.turnosServices.getEspecialistasYPacientes().subscribe(data => {
      this.turnos = data.map(turno => ({
        ...turno,
        fecha: turno.fecha
          ? new Date(turno.fecha).toISOString().split('T')[0] // yyyy-MM-dd
          : ''
      }));
    });
  }

  cargarEspecialistas() {
    this.usuariosServices.getEspecialistas().subscribe((data: Usuario[]) => {
      this.especialistas = data;
    });
  }

  guardarTurno(turno: Turno) {
    this.turnosServices.updateTurnos(turno.idTurno, turno).subscribe({
      next: () => {
        //alert(`Turno ${turno.idTurno} actualizado correctamente`);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Turno  modificado con éxito 🎉',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        //console.error('Error al actualizar turno:', err);
        //alert('No se pudo actualizar el turno');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo modificar el turno'
        });
      },
    });
  }
}
