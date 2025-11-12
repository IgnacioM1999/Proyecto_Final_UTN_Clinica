import { Component, OnInit } from '@angular/core';
import { Paciente, PacientesServices } from '../../../services/pacientes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Turno } from '../../../services/turnos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-clinico',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './historial-clinico.html',
  styleUrl: './historial-clinico.css'
})
export class HistorialClinicoEsp implements OnInit {

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
      next: (data) => {
        this.pacientes = data;
        this.pacientesFiltrados = [...this.pacientes];
      },
      error: (err) => console.error('Error al cargar pacientes:', err)
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
