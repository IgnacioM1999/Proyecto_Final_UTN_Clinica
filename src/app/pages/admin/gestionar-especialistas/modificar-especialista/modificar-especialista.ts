import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-especialista',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-especialista.html',
  styleUrl: './modificar-especialista.css'
})
export class ModificarEspecialista implements OnInit {

  /*especialistas = [
    {legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email:'roberto@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email:'pablo@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
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

  //Metodo que al apretar el boton Guardar, guarde los cambios del especialista en la base de datos
    guardarEspecialista(especialista: any): void {
    //Armar los objetos usuario y especialista igual que en el backend
    const data = {
      usuario: {
        dniUsuario: especialista.dniEspecialista,
        nombreYApellido: especialista.nombreYApellido,
        telefono: especialista.telefono,
        mail: especialista.mail,
        nombreUsuario: especialista.nombreUsuario,
        contrasenia: especialista.contrasenia,
      },
      especialista: {
        dniEspecialista: especialista.dniEspecialista,
        horasSupervisor: especialista.horasSupervisor,
        titulos: especialista.titulos
      }
    };

    // Llamar al servicio para actualizar
    this.especialistasServices.updateEspecialistas(especialista.dniEspecialista, data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Especialista actualizado',
          text: `El especialista ${especialista.nombreYApellido} fue actualizado correctamente.`,
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al actualizar especialista:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al intentar guardar los cambios.',
          confirmButtonText: 'Cerrar'
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
