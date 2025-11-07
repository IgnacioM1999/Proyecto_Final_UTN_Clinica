import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-paciente',
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css'
})
export class Paciente {

  constructor(private router: Router) { }

  salir() {
    this.router.navigate(["/"]); //Navega a la ruta laiz, que seria el login
  }

  agendarTurno() {
    this.router.navigate(["/paciente/agendar-turno"]);
  }

  verTurnos() {
    this.router.navigate(["/paciente/ver-turnos"])
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }


}
