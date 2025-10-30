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
  standalone: true,
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
  fechaFiltro: string = ''; //fecha seleccionada en el input
  turnosFiltrados: Turno[] = [];

  constructor(private turnosServices: TurnosServices, private especialistasServices: EspecialistasServices, private usuariosServices: UsuariosServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
    this.cargarEspecialistas();
  }

  //Cargar turnos desde el backend
  cargarTurnos(): void {
    console.log('se inicio el cargar turnos antes del getEspecialistasYPacientes');
    this.turnosServices.getEspecialistasYPacientes().subscribe({
      next: (data) => {
        this.turnos = data.map(turno => ({
          ...turno,
          fecha: turno.fecha
            ? new Date(turno.fecha).toISOString().split('T')[0] // yyyy-MM-dd
            : ''
        }));
        console.log('turnos traidos:',this.turnos);
        this.turnosFiltrados = [...this.turnos];
      },
      error: (err) => console.error('Error al cargar turnos:', err)
    });
  }

  cargarEspecialistas() {
    this.usuariosServices.getEspecialistas().subscribe({
      next: (data: Usuario[]) => this.especialistas = data,
      error: (err) => console.error('Error al cargar especialistas:', err)
    });
  }
  

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.turnosFiltrados = [...this.turnos];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    this.turnosFiltrados = this.turnos.filter(turno => {
      // turno.fecha ya está normalizada en formato yyyy-MM-dd desde cargarTurnos()
      return turno.fecha === this.fechaFiltro;
    });
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.turnosFiltrados = [...this.turnos];
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
