import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Pasante, PasantesServices } from '../../../../services/pasantes';

@Component({
  selector: 'app-listar-pasante',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-pasante.html',
  styleUrl: './listar-pasante.css'
})
export class ListarPasante implements OnInit {

  /*pasantes = [
    {legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email:'nico@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email:'vale@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
  ];*/

  pasantesFiltrados: Pasante[] = [];
  pasantes: Pasante[] = [];
  dniPasanteFiltrado: string = '';
  nombrePasanteFiltro: string = '';

  constructor(private pasantesServices: PasantesServices) { }

  ngOnInit(): void {
    this.cargarPasantes();
  }

  cargarPasantes(): void {
    this.pasantesServices.getPasantes().subscribe({
      next: (data) =>{ 
        this.pasantes = data;
        this.pasantesFiltrados = [...this.pasantes];
      },
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  filtrarPasantes(): void {
    // Si no se ingresó ningún filtro, mostrar todos los pasantes
    if (!this.nombrePasanteFiltro && !this.dniPasanteFiltrado) {
      this.pasantesFiltrados = [...this.pasantes];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.pasantesFiltrados = this.pasantes.filter(pasante => {
      const coincideNombre = this.nombrePasanteFiltro
        ? pasante.nombreYApellido?.toLowerCase().includes(this.nombrePasanteFiltro.toLowerCase())
        : true;

      const coincideDni = this.dniPasanteFiltrado
        ? pasante.dniPasante?.includes(this.dniPasanteFiltrado)
        : true;

      return coincideNombre && coincideDni;
    });
  }

  limpiarFiltroPasante(): void {
    this.dniPasanteFiltrado = '';
    this.nombrePasanteFiltro = '';
    this.pasantesFiltrados = [...this.pasantes];
  }

}
