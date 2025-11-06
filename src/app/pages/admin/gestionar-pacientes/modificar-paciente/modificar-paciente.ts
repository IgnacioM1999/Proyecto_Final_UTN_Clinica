import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Paciente, PacientesServices } from '../../../../services/pacientes';

@Component({
  selector: 'app-modificar-paciente',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-paciente.html',
  styleUrl: './modificar-paciente.css'
})
export class ModificarPaciente implements OnInit {
  /*pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];*/

  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  dniPacienteFiltrado: string = '';
  nombrePacienteFiltro: string = '';

  constructor(private pacientesServices: PacientesServices) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacientesServices.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.pacientesFiltrados = [...this.pacientes];
        // 🔹 Convertir las fechas al formato YYYY-MM-DD
        this.pacientesFiltrados = this.pacientes.map((p: any) => {
          if (p.fechaNacimiento) {
            // Asegura que se guarde en formato ISO válido para el input date
            p.fechaNacimiento = new Date(p.fechaNacimiento).toISOString().split('T')[0];
          }
          return p;
        });
      },
      error: (err) => console.error('Error al cargar pacientes:', err)
    });
  }

  guardarPaciente(paciente: any): void {
    //Armar los objetos usuario y paciente igual que en el backend
    const data = {
      usuario: {
        dniUsuario: paciente.dniEspecialista,
        nombreYApellido: paciente.nombreYApellido,
        telefono: paciente.telefono,
        mail: paciente.mail,
        nombreUsuario: paciente.nombreUsuario,
        contrasenia: paciente.contrasenia,
      },
      paciente: {
        dniPaciente: paciente.dniPaciente,
        obraSocial: paciente.obraSocial,
        fechaNacimiento: paciente.fechaNacimiento,
        sexo: paciente.sexo
      }
    };

    //Llamar al servicio para actualizar
    this.pacientesServices.updatePacientes(paciente.dniPaciente, data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Paciente actualizado',
          text: `El paciente ${paciente.nombreYApellido} fue actualizado correctamente.`,
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al actualizar paciente:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al intentar guardar los cambios.',
          confirmButtonText: 'Cerrar'
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
