import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalles-sesion',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalles-sesion.html',
  styleUrl: './detalles-sesion.css'
})
export class DetallesSesion implements OnInit {

  dniPaciente: number | null = null
  idSesionSelect: number | null = null

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Capturamos el parámetro de la URL
    this.dniPaciente = Number(this.route.snapshot.paramMap.get('pacienteDni')) // pacienteDni se lo definio en app.routes
    this.idSesionSelect = Number(this.route.snapshot.paramMap.get('idSesion')) // este idSesion se lo definio en app.routes

    //this.sesionesFiltradas = this.sesiones.filter(
    //  sesion => sesion.dni === this.dniPaciente
    //);
  }

}
