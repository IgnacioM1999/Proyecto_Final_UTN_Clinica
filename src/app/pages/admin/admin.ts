import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})

export class Admin {

  constructor(private router: Router){}

  secciones = [
    {nombre:'Gestionar Turnos' , ruta:''},
    {nombre:'Gestionar Sesiones' , ruta:''},
    {nombre:'Gestionar Especialistas' , ruta:''},
    {nombre:'Gestionar Pasantes' , ruta:''},
    {nombre:'Gestionar Pacientes' , ruta:''},
    {nombre:'Gestionar Instrumentos' , ruta:''},
    {nombre:'Historial Clinico' , ruta:''},
  ]

  salir(){
    this.router.navigate(["/"]); //Navega a la ruta laiz, que seria el login
  }

  gestionarTurnos(){
    this.router.navigate(["/admin/gestionar-turnos"]);
  }

  gestionarInsumos(){
    this.router.navigate(["/admin/gestionar-insumos"])
  }

  gestionarPasantes(){
    this.router.navigate(["/admin/gestionar-pasantes"])
  }

    gestionarPacientes(){
    this.router.navigate(["/admin/gestionar-pacientes"])
  }

    gestionarEspecialistas(){
    this.router.navigate(["/admin/gestionar-especialistas"])
  }

    gestionarSesiones(){
    this.router.navigate(["/admin/gestionar-sesiones"])
  }

  historialClinico(){
    this.router.navigate(["/admin/historial-clinico"])
  }

  verPerfil() {
  this.router.navigate(['/perfil']); 
}

}
