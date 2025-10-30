import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-especialista',
  imports: [RouterLink, CommonModule],
  templateUrl: './especialista.html',
  styleUrl: './especialista.css'
})
export class Especialista {

  constructor(private router:Router){}

  salir(){
    this.router.navigate(["/"]); //Navega a la ruta laiz, que seria el login
  }

  gestionarTurnosHoy(){
    this.router.navigate(["/especialista/gestionar-turnos-hoy"]);
  }

  gestionarSesion(){
    this.router.navigate(["/especialista/gestion-sesiones"])
  }

  historialClinico(){
    this.router.navigate(["/especialista/historial-clinico"])
  }

  verPerfil() {
  this.router.navigate(['/perfil']); 
}

}
