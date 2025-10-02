import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-insumo',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './crear-insumo.html',
  styleUrl: './crear-insumo.css'
})
export class CrearInsumo {

  nuevoInsumo: Insumo = {
    idInsumos: 0,   // no lo enviamos porque lo genera MySQL ya que esta declarado como AUTO-INCREMENT
    nombre: '',
    descripcion: '',
    cantidad: 0
  };

  constructor(private insumosService: InsumosServices, private router: Router) { }

  guardarInsumo() {
    this.insumosService.createInsumo(this.nuevoInsumo).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Insumo registrado con éxito 🎉',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al crear insumo:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el insumo, revise los campos.'
        });
      }
    });
  }
}
