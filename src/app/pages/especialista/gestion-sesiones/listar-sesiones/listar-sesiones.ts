import { Component, OnInit } from '@angular/core';
import { Sesion, SesionesServices } from '../../../../services/sesiones';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-sesiones',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-sesiones.html',
  styleUrl: './listar-sesiones.css'
})
export class ListarSesiones implements OnInit {

  dniPacienteFiltrado: string = '';
  nombrePacienteFiltro: string = '';

  sesiones: Sesion[] = [];
  sesionesFiltradas: Sesion[] = [];

  constructor(private sesionesServices: SesionesServices) { }

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
