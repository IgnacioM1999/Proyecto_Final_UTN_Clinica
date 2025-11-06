import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-sesiones-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listado-sesiones-paciente.html',
  styleUrl: './listado-sesiones-paciente.css'
})
export class ListadoSesionesPaciente implements OnInit {
  /*sesiones = [
    { idSesion: 1, dni: 16889123, nomApePaciente: 'Alexis Rodriguez', nomApeEspecialista: "Enrique Ratti", fecha: "2025-01-01" },
    { idSesion: 2, dni: 20555333, nomApePaciente: "Maria Benjamin", nomApeEspecialista: "Manuel Ferrari", fecha: "2025-09-10" },
    { idSesion: 3, dni: 37009008, nomApePaciente: "Josefina Martinez", nomApeEspecialista: "Osvaldo Montoya", fecha: "2025-05-20" },
    { idSesion: 4, dni: 37009008, nomApePaciente: "Josefina Martinez", nomApeEspecialista: "Osvaldo Montoya", fecha: "2025-05-25" }
  ]*/

  dniPacienteSeleccionado: string = '';
  nombrePaciente: string = '';
  sesionIdSeleccionado: number | null = null;
  sesiones: Sesion[] = [];
  sesionesFiltradas: Sesion[] = [];
  fechaFiltro: string = ''; //fecha seleccionada en el input


  constructor(private route: ActivatedRoute, private sesionesServices: SesionesServices) { }

  ngOnInit(): void {
    // Capturamos el parámetro de la URL
    const dni = this.route.snapshot.paramMap.get('pacienteDni') // pacienteDni se lo definio en app.routes
    if (dni) {
      this.dniPacienteSeleccionado = dni;
      this.cargarSesionesPaciente(dni);
    } else {
      console.warn('No se recibió el parámetro pacienteDni en la ruta.');
    }
  }

  cargarSesionesPaciente(dniPaciente: string): void {
    this.sesionesServices.getSesionesPaciente(dniPaciente).subscribe({
      next: (data) => {
        this.sesiones = data;
        this.sesionesFiltradas = [...this.sesiones]

        // 🔹 Si hay sesiones, guardamos el nombre del paciente desde la primera
        if (this.sesiones.length > 0) {
          this.nombrePaciente = this.sesiones[0].nombreYApellidoPaciente ?? 'Sin nombre registrado';
        } else {
          this.nombrePaciente = 'Sin sesiones registradas';
        }
      },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }
    filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const fechaTurno = new Date(sesion.fecha).toISOString().split('T')[0];
      return fechaTurno === this.fechaFiltro;
    });
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.sesionesFiltradas = [...this.sesiones];
  }
}
