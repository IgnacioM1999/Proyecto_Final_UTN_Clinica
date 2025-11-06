import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';

@Component({
  selector: 'app-listar-insumo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-insumo.html',
  styleUrl: './listar-insumo.css'
})
export class ListarInsumo implements OnInit {

  insumosBack: Insumo[] = [];
  insumosFiltrados: Insumo[] = [];
  nombreInsumoFiltro: string = '';

  constructor(private insumosService: InsumosServices) { }

  ngOnInit(): void {
    this.cargarInsumos();
  }

  //Cargar insumos desde el backend
  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data) => {
        this.insumosBack = data
        this.insumosFiltrados = [...this.insumosBack]
      },
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  filtrarInsumo(): void {
    // Si no se ingresó ningún filtro, mostrar todos los insumos
    if (!this.nombreInsumoFiltro) {
      this.insumosFiltrados = [...this.insumosBack];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.insumosFiltrados = this.insumosBack.filter(insumo => {
      const coincideNombre = this.nombreInsumoFiltro
        ? insumo.nombre?.toLowerCase().includes(this.nombreInsumoFiltro.toLowerCase())
        : true;

      return coincideNombre;
    });
  }

  limpiarFiltroInsumo(): void {
    this.nombreInsumoFiltro = '';
    this.insumosFiltrados = [...this.insumosBack];
  }
}

