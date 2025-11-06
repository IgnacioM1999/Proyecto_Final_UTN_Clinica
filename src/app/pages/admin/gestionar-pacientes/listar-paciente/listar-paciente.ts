import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Paciente, PacientesServices } from '../../../../services/pacientes';

@Component({
  selector: 'app-listar-paciente',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-paciente.html',
  styleUrl: './listar-paciente.css'
})
export class ListarPaciente implements OnInit {

  /* pacientes = [
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
      next: (data) =>  {
        this.pacientes = data;
        this.pacientesFiltrados = [...this.pacientes];
      },
      error: (err) => console.error('Error al cargar insumos:', err)
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
