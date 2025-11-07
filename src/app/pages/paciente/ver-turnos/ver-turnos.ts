import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Turno, TurnosServices } from '../../../services/turnos';

@Component({
  selector: 'app-ver-turnos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ver-turnos.html',
  styleUrl: './ver-turnos.css'
})
export class VerTurnos implements OnInit {

  turnos: Turno[] = []
  fechaFiltro: string = ''; //fecha seleccionada en el input
  turnosFiltrados: Turno[] = [];

  constructor(private turnosServices: TurnosServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); //Transforma la cadena JSON en el objeto Usuario
    const dniPaciente = usuario.dniUsuario;
    this.turnosServices.getTurnosReservados(dniPaciente).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.turnos = data;
        this.turnosFiltrados = [...this.turnos]; // inicializa con todos los turnos
      },
      error: (err) => console.error('Error al cargar turnos:', err)
    }
    )
  }

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.turnosFiltrados = [...this.turnos];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    const filtroISO = new Date(this.fechaFiltro).toISOString().split('T')[0];
    this.turnosFiltrados = this.turnos.filter(turno => {
      const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
      return fechaTurno === filtroISO;
    });
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.turnosFiltrados = [...this.turnos];
  }
}
