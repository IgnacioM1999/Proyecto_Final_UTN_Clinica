import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';

@Component({
  selector: 'app-listar-sesion',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-sesion.html',
  styleUrl: './listar-sesion.css'
})
export class ListarSesion implements OnInit {

  constructor(private sesionesServices: SesionesServices) { }

  /*sesiones = [
    {idSesion: 1, nomApePaciente: 'Matias Rubia', nomApeEspecialista:"Enrique Ratti" },
    {idSesion: 2, nomApePaciente: "Danilo Nuñez", nomApeEspecialista:"Manuel Ferrari" },
    {idSesion: 3, nomApePaciente: "Alejo Fernandez", nomApeEspecialista:"Osvaldo Montoya" }
  ]*/

  dniPacienteFiltrado: string = '';
  nombrePacienteFiltro: string = '';

  sesiones: Sesion[] = [];
  sesionesFiltradas: Sesion[] = [];

  ngOnInit(): void {
    this.cargarSesiones();
  }

  //Cargar sesiones desde el backend
  cargarSesiones(): void {
    this.sesionesServices.getSesionesConNombres().subscribe({
      next: (data) => {
        this.sesiones = data;
        this.sesionesFiltradas = [...this.sesiones];
      },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }

  filtrarSesiones(): void {
    // Si no se ingresó ningún filtro, mostrar todas las sesiones
    if (!this.nombrePacienteFiltro && !this.dniPacienteFiltrado) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const coincideNombre = this.nombrePacienteFiltro
        ? sesion.nombreYApellidoPaciente?.toLowerCase().includes(this.nombrePacienteFiltro.toLowerCase())
        : true;

      const coincideDni = this.dniPacienteFiltrado
        ? sesion.dniPaciente?.includes(this.dniPacienteFiltrado)
        : true;

      return coincideNombre && coincideDni;
    });
  }

  limpiarFiltroSesion(): void {
    this.dniPacienteFiltrado = '';
    this.nombrePacienteFiltro = '';
    this.sesionesFiltradas = [...this.sesiones];
  }


}
