import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-sesiones',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './gestion-sesiones.html',
  styleUrl: './gestion-sesiones.css'
})
export class GestionSesiones {

}
