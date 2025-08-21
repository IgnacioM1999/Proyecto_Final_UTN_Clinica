import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-especialista',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-especialista.html',
  styleUrl: './listar-especialista.css'
})
export class ListarEspecialista {

  constructor(private router: Router) { }

  especialistas = [
    { legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email: 'roberto@gmail.com', contrasenia: '123' },
    { legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email: 'pablo@gmail.com', contrasenia: '456' },
    { legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email: 'martin@gmail.com', contrasenia: 'hola' },
  ];

}
