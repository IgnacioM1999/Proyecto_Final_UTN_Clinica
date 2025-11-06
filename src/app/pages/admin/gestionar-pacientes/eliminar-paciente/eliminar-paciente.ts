import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Paciente, PacientesServices } from '../../../../services/pacientes';
import { UsuariosServices } from '../../../../services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-paciente',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './eliminar-paciente.html',
  styleUrl: './eliminar-paciente.css'
})
export class EliminarPaciente implements OnInit {

  constructor(private pacientesServices: PacientesServices, private usuariosServices: UsuariosServices) { }

  /*pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];*/

  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  dniPacienteFiltrado: string = '';
  nombrePacienteFiltro: string = '';

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacientesServices.getPacientes().subscribe({
      next: (data) =>{
        this.pacientes = data;
        this.pacientesFiltrados = [...this.pacientes];
      },
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  eliminarPaciente(dni: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a dar de baja a este paciente',
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
            this.pacientes = this.pacientes.filter(e => e.dniPaciente !== dni);
            Swal.fire({
              title: 'Eliminado!',
              text: 'El paciente ha sido dado de baja',
              icon: 'success',
              confirmButtonColor: '#198754'
            });
          },
          error: (err) => {
            console.error('Error al dar de baja al paciente:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo dar de baja al paciente. Intenta nuevamente.',
              icon: 'error',
              confirmButtonColor: '#0d6efd'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El paciente no fue dado de baja',
          icon: 'info',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  filtrarPacientes(): void {
    // Si no se ingresó ningún filtro, mostrar todos los pacientes
    if (!this.nombrePacienteFiltro && !this.dniPacienteFiltrado) {
      this.pacientesFiltrados = [...this.pacientes];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.pacientesFiltrados = this.pacientes.filter(paciente => {
      const coincideNombre = this.nombrePacienteFiltro
        ? paciente.nombreYApellido?.toLowerCase().includes(this.nombrePacienteFiltro.toLowerCase())
        : true;

      const coincideDni = this.dniPacienteFiltrado
        ? paciente.dniPaciente?.includes(this.dniPacienteFiltrado)
        : true;

      return coincideNombre && coincideDni;
    });
  }

  limpiarFiltroPaciente(): void {
    this.dniPacienteFiltrado = '';
    this.nombrePacienteFiltro = '';
    this.pacientesFiltrados = [...this.pacientes];
  }

}
