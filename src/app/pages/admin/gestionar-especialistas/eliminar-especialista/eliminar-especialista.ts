import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import { UsuariosServices } from '../../../../services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-especialista',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './eliminar-especialista.html',
  styleUrl: './eliminar-especialista.css'
})
export class EliminarEspecialista implements OnInit {

  /*especialistas = [
    { legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email: 'roberto@gmail.com', contrasenia: '123' },
    { legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email: 'pablo@gmail.com', contrasenia: '456' },
    { legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email: 'martin@gmail.com', contrasenia: 'hola' },
  ];*/

  especialistas: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  dniEspecialistaFiltrado: string = '';
  nombreEspecialistaFiltro: string = '';

  constructor(private especialistasServices: EspecialistasServices, private usuariosServices: UsuariosServices) { }

  ngOnInit(): void {
    this.cargarEspecialistas();
  }

  cargarEspecialistas(): void {
    this.especialistasServices.getEspecialistas().subscribe({
      next: (data) =>{
        this.especialistas = data;
        this.especialistasFiltrados = [...this.especialistas];
      },
      error: (err) => console.error('Error al cargar especialistas:', err)
    });
  }

  eliminarEspecialista(dni: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Daras de baja al especialista',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, dar baja',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServices.deleteUsuarios(dni).subscribe({ //se hace la eliminacion logica seteando en el campo estado a inactivo en la tabla usuarios
          next: () => {
            this.especialistas = this.especialistas.filter(e => e.dniEspecialista !== dni);
            Swal.fire({
              title: 'Éxito!',
              text: 'El especialista ha sido dado de baja correctamente.',
              icon: 'success',
              confirmButtonColor: '#198754'
            });
          },
          error: (err) => {
            console.error('Error al dar de baja al especialista:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo dar de baja el especialista. Intenta nuevamente.',
              icon: 'error',
              confirmButtonColor: '#0d6efd'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El especialista no fue dado de baja.',
          icon: 'info',
          confirmButtonColor: '#0d6efd'
        });
      }
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
