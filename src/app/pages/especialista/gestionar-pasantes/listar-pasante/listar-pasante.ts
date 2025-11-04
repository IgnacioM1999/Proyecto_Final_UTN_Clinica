import { Component, OnInit } from '@angular/core';
import { Pasante, PasantesServices } from '../../../../services/pasantes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-pasante',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './listar-pasante.html',
  styleUrl: './listar-pasante.css'
})
export class ListarPasanteEsp implements OnInit {

  dniPasanteFiltrado: string = '';
  nombrePasanteFiltro: string = '';

  pasantesFiltrados: Pasante[] = [];
  pasantes: Pasante[] = [];

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
