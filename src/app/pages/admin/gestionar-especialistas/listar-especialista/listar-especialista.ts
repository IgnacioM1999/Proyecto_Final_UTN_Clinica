import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';

@Component({
  selector: 'app-listar-especialista',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-especialista.html',
  styleUrl: './listar-especialista.css'
})
export class ListarEspecialista implements OnInit {

  /*especialistas = [
    { legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email: 'roberto@gmail.com', contrasenia: '123' },
    { legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email: 'pablo@gmail.com', contrasenia: '456' },
    { legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email: 'martin@gmail.com', contrasenia: 'hola' },
  ];*/

  especialistas: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  dniEspecialistaFiltrado: string = '';
  nombreEspecialistaFiltro: string = '';

  constructor(private especialistasServices: EspecialistasServices) { }

  ngOnInit(): void {
    this.cargarEspecialistas();
  }

  cargarEspecialistas(): void {
    this.especialistasServices.getEspecialistas().subscribe({
      next: (data) => {
        this.especialistas = data;
        this.especialistasFiltrados = [...this.especialistas];
      },
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  filtrarEspecialistas(): void {
    // Si no se ingresó ningún filtro, mostrar todos los especialistas
    if (!this.nombreEspecialistaFiltro && !this.dniEspecialistaFiltrado) {
      this.especialistasFiltrados = [...this.especialistas];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.especialistasFiltrados = this.especialistas.filter(especialista => {
      const coincideNombre = this.nombreEspecialistaFiltro
        ? especialista.nombreYApellido?.toLowerCase().includes(this.nombreEspecialistaFiltro.toLowerCase())
        : true;

      const coincideDni = this.dniEspecialistaFiltrado
        ? especialista.dniEspecialista?.includes(this.dniEspecialistaFiltrado)
        : true;

      return coincideNombre && coincideDni;
    });
  }

  limpiarFiltroEspecialista(): void {
    this.dniEspecialistaFiltrado = '';
    this.nombreEspecialistaFiltro = '';
    this.especialistasFiltrados = [...this.especialistas];
  }

}
