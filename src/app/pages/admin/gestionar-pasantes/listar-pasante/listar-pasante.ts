import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-pasante',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-pasante.html',
  styleUrl: './listar-pasante.css'
})
export class ListarPasante {

  constructor(private router: Router){}

  pasantes = [
    {legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email:'nico@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email:'vale@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
  ];

}
