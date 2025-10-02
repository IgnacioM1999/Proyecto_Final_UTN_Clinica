import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-insumo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './modificar-insumo.html',
  styleUrl: './modificar-insumo.css'
})
export class ModificarInsumo {

  insumos = [
    { id: 1, nombre: 'Agujas de acupuntura', descripcion: 'Agujas estériles desechables para sesiones de acupuntura', cantidad: 200 },
    { id: 2, nombre: 'Moxa', descripcion: 'Bastones de artemisa seca para terapia de moxibustión', cantidad: 500 },
    { id: 3, nombre: 'Ventosas', descripcion: 'Juego de ventosas de vidrio y plástico para terapia de succión', cantidad: 70 },
  ];

  insumosBack: Insumo[] = []

  constructor(private insumosService: InsumosServices) { }

  ngOnInit(): void {
    this.cargarInsumos();
  }

  //Cargar insumos desde el backend
  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data) => this.insumosBack = data,
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  guardarInsumo(insumo: Insumo) {
    this.insumosService.updateInsumo(insumo.idInsumos, insumo).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Insumo modificado con éxito 🎉',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al actualizar insumo:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo modificar el insumo, revise los campos.'
        });
      },
    });
  }

}
