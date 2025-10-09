import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-insumo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar-insumo.html',
  styleUrl: './eliminar-insumo.css'
})
export class EliminarInsumo implements OnInit {

  /*insumos = [
    { id: 1, nombre: 'Agujas de acupuntura', descripcion: 'Agujas estériles desechables para sesiones de acupuntura', cantidad: 200 },
    { id: 2, nombre: 'Moxa', descripcion: 'Bastones de artemisa seca para terapia de moxibustión', cantidad: 500 },
    { id: 3, nombre: 'Ventosas', descripcion: 'Juego de ventosas de vidrio y plástico para terapia de succión', cantidad: 70 },
  ];*/

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar el insumo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.insumosService.deleteInsumo(id).subscribe({
          next: () => {
            // Quitar el turno de la lista en el frontend
            this.insumosBack = this.insumosBack.filter(i => i.idInsumos !== id);
            //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo
            // //solo con los elementos cuyo id sea distinto del id que queremos eliminar.

            Swal.fire({
              title: 'Eliminado!',
              text: 'El insumo ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonColor: '#198754'
            });
          },
          error: (err) => {
            console.error('Error al eliminar insumo:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el insumo. Intenta nuevamente.',
              icon: 'error',
              confirmButtonColor: '#0d6efd'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El insumo no fue eliminado.',
          icon: 'info',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

}
