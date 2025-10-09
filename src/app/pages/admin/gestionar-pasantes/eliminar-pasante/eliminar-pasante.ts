import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pasante, PasantesServices } from '../../../../services/pasantes';
import Swal from 'sweetalert2';
import { UsuariosServices } from '../../../../services/usuarios';

@Component({
  selector: 'app-eliminar-pasante',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './eliminar-pasante.html',
  styleUrl: './eliminar-pasante.css'
})
export class EliminarPasante {
  /*pasantes = [
  {legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email:'nico@gmail.com', contrasenia: '123'},
  {legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email:'vale@gmail.com', contrasenia: '456'},
  {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
];*/

  constructor(private pasantesServices: PasantesServices, private usuariosServices: UsuariosServices) { }

  pasantes: Pasante[] = [];

  ngOnInit(): void {
    this.cargarPasantes();
  }

  cargarPasantes(): void {
    this.pasantesServices.getPasantes().subscribe({
      next: (data) => this.pasantes = data,
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  eliminarPasantes(dni: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a dar de baja a este pasante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServices.deleteUsuarios(dni).subscribe({
          next: () => {
            this.pasantes = this.pasantes.filter(e => e.dniPasante !== dni);
            Swal.fire({
              title: 'Eliminado!',
              text: 'El pasante ha sido dado de baja',
              icon: 'success',
              confirmButtonColor: '#198754'
            });
          },
          error: (err) => {
            console.error('Error al dar de baja al pasante:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo dar de baja al pasante. Intenta nuevamente.',
              icon: 'error',
              confirmButtonColor: '#0d6efd'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El pasante no fue dado de baja',
          icon: 'info',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }
}
