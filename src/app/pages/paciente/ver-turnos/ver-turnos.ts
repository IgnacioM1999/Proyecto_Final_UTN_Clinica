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
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // eliminamos las horas, minutos y segundos

        // Función auxiliar para comparar fechas sin tener en cuenta la hora
        const esMismoODiaPosterior = (fechaTurno: Date, hoy: Date): boolean => {
          const fTurno = new Date(fechaTurno.getFullYear(), fechaTurno.getMonth(), fechaTurno.getDate());
          const fHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
          return fTurno >= fHoy;
        };

        // Filtramos solo los turnos con fecha >= hoy
        this.turnos = data.filter(t => esMismoODiaPosterior(new Date(t.fecha), hoy));
        this.turnosFiltrados = [...this.turnos];
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
