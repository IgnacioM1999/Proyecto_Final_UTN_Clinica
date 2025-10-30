import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';

@Component({
  selector: 'app-listado-sesiones-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  dniPacienteSeleccionado : string = ''
  nombrePaciente: string = ''
  sesionIdSeleccionado: number | null = null
  sesionesFiltradas: Sesion[] =[]

  
  constructor(private route: ActivatedRoute, private sesionesServices:SesionesServices) { }

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

  cargarSesionesPaciente(dniPaciente:string): void {
    this.sesionesServices.getSesionesPaciente(dniPaciente).subscribe({
      next: (data) => {
      this.sesionesFiltradas = data;

      // 🔹 Si hay sesiones, guardamos el nombre del paciente desde la primera
      if (data.length > 0) {
        this.nombrePaciente = data[0].nombreYApellidoPaciente ?? 'Sin nombre registrado';
      } else {
        this.nombrePaciente = 'Sin sesiones registradas';
      }
    },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }
}
