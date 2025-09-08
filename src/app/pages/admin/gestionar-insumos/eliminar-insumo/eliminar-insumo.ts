import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';

@Component({
  selector: 'app-eliminar-insumo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar-insumo.html',
  styleUrl: './eliminar-insumo.css'
})
export class EliminarInsumo implements OnInit {

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

  eliminarInsumo(id: number) {
    if (confirm('¿Seguro que deseas eliminar este insumo?')) {
      this.insumosService.deleteInsumo(id).subscribe({
        next: () => {
          // Actualizar lista en frontend
          this.insumosBack = this.insumosBack.filter((i) => i.idInsumos !== id);
          alert('Insumo eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar insumo:', err);
          alert('No se pudo eliminar el insumo');
        },
      });
    }
  }

}
