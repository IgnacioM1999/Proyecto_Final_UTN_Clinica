import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
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

}
