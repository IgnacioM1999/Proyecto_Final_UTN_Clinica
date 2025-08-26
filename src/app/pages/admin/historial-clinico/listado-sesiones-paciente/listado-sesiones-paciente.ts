import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-sesiones-paciente',
  imports: [CommonModule, RouterModule],
  templateUrl: './listado-sesiones-paciente.html',
  styleUrl: './listado-sesiones-paciente.css'
})
export class ListadoSesionesPaciente implements OnInit {

  dniPaciente: number | null = null
  sesionIdSeleccionado: number | null = null
  sesiones = [
    { idSesion: 1, dni: 16889123, nomApePaciente: 'Alexis Rodriguez', nomApeEspecialista: "Enrique Ratti", fecha: "2025-01-01" },
    { idSesion: 2, dni: 20555333, nomApePaciente: "Maria Benjamin", nomApeEspecialista: "Manuel Ferrari", fecha: "2025-09-10" },
    { idSesion: 3, dni: 37009008, nomApePaciente: "Josefina Martinez", nomApeEspecialista: "Osvaldo Montoya", fecha: "2025-05-20" },
    { idSesion: 4, dni: 37009008, nomApePaciente: "Josefina Martinez", nomApeEspecialista: "Osvaldo Montoya", fecha: "2025-05-25" }
  ]
  sesionesFiltradas: any[] =[]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Capturamos el parámetro de la URL
    this.dniPaciente = Number(this.route.snapshot.paramMap.get('pacienteDni')) // pacienteDni se lo definio en app.routes

    this.sesionesFiltradas = this.sesiones.filter(
      sesion => sesion.dni === this.dniPaciente
    );
  }

}
