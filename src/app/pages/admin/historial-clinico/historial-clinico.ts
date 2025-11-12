import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Paciente, PacientesServices } from '../../../services/pacientes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-clinico',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './historial-clinico.html',
  styleUrl: './historial-clinico.css'
})
export class HistorialClinico implements OnInit {
  /*pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];*/

  pacienteDniSeleccionado: string | null = null;
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  nombrePacienteFiltro: string = '';

  constructor(private pacientesServices: PacientesServices) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacientesServices.getPacientesHistorialClinico().subscribe({
      next: (data) =>{ 
        this.pacientes = data
        this.pacientesFiltrados = [...this.pacientes]},
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

    filtrarPacientes(): void {
    // Si no se ingresó ningún filtro, mostrar todos los turnos
    if (!this.nombrePacienteFiltro) {
      this.pacientesFiltrados = [...this.pacientes];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.pacientesFiltrados = this.pacientes.filter(paciente => {
      const coincideNombre = this.nombrePacienteFiltro
        ? paciente.nombreYApellido?.toLowerCase().includes(this.nombrePacienteFiltro.toLowerCase())
        : true;

      return coincideNombre;
    });
  }

  limpiarFiltroPacientes(): void {
    this.nombrePacienteFiltro = '';
    this.pacientesFiltrados = [...this.pacientes];
  }

}
