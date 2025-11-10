import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pasante',
  imports: [RouterLink, CommonModule],
  templateUrl: './pasante.html',
  styleUrl: './pasante.css'
})
export class Pasante {

  constructor(private router:Router){}

  salir() {
    this.router.navigate(["/"]); //Navega a la ruta laiz, que seria el login
  }

  verEstado() {
    this.router.navigate(["/pasante/ver-estado"]);
  }

  verSesiones() {
    this.router.navigate(["/pasante/ver-sesiones"])
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }

}
