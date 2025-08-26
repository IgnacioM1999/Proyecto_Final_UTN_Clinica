import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-sesion',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-sesion.html',
  styleUrl: './listar-sesion.css'
})
export class ListarSesion {

  constructor(private router: Router){}

  sesiones = [
    {idSesion: 1, nomApePaciente: 'Matias Rubia', nomApeEspecialista:"Enrique Ratti" },
    {idSesion: 2, nomApePaciente: "Danilo Nuñez", nomApeEspecialista:"Manuel Ferrari" },
    {idSesion: 3, nomApePaciente: "Alejo Fernandez", nomApeEspecialista:"Osvaldo Montoya" }
  ]

}
