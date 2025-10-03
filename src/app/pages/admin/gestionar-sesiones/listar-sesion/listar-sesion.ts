import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';

@Component({
  selector: 'app-listar-sesion',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-sesion.html',
  styleUrl: './listar-sesion.css'
})
export class ListarSesion  implements OnInit {

  constructor(private sesionesServices: SesionesServices){}

  /*sesiones = [
    {idSesion: 1, nomApePaciente: 'Matias Rubia', nomApeEspecialista:"Enrique Ratti" },
    {idSesion: 2, nomApePaciente: "Danilo Nuñez", nomApeEspecialista:"Manuel Ferrari" },
    {idSesion: 3, nomApePaciente: "Alejo Fernandez", nomApeEspecialista:"Osvaldo Montoya" }
  ]*/

    sesiones: Sesion[]=[]

  ngOnInit(): void {
    this.cargarSesiones();
  }

  //Cargar sesiones desde el backend
  cargarSesiones(): void {
    this.sesionesServices.getSesionesConNombres().subscribe({
      next: (data) => this.sesiones = data,
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }

}
