import { Component, OnInit } from '@angular/core';
import { Sesion, SesionesServices } from '../../../services/sesiones';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-ver-sesiones',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ver-sesiones.html',
  styleUrl: './ver-sesiones.css'
})
export class VerSesiones implements OnInit {
  sesiones: Sesion[] = []
  fechaFiltro: string = ''; //fecha seleccionada en el input
  sesionesFiltradas: Sesion[] = [];
  sesionSeleccionada: Sesion | null = null; //del boton del Ver Detalle para abrir el modal

  constructor(private sesionesServices: SesionesServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); //Transforma la cadena JSON en el objeto Usuario
    const dniPasante = usuario.dniUsuario;
    this.sesionesServices.getSesionesPasante(dniPasante).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.sesiones = data;
        this.sesionesFiltradas = [...this.sesiones]; // inicializa con todos los turnos
      },
      error: (err) => console.error('Error al cargar las sesiones del pasante:', err)
    }
    )
  }

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    const filtroISO = new Date(this.fechaFiltro).toISOString().split('T')[0];
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const fechaTurno = new Date(sesion.fecha).toISOString().split('T')[0];
      return fechaTurno === filtroISO;
    });
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.sesionesFiltradas = [...this.sesiones];
  }

  abrirModal(sesion: Sesion) {
  this.sesionSeleccionada = sesion;

  // Mostrar el modal manualmente
  const modalElement = document.getElementById('detalleModal');
  const modal = new bootstrap.Modal(modalElement!);
  modal.show();
  }

}
