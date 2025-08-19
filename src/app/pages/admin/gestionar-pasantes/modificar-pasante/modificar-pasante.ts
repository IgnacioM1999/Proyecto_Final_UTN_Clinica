import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modificar-pasante',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-pasante.html',
  styleUrl: './modificar-pasante.css'
})
export class ModificarPasante {

  constructor(private router: Router){}
  
  pasantes = [
    {legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email:'nico@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email:'vale@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
  ];

  guardarPasante(pasante: any) {
    console.log('Pasante guardado:', pasante);
    alert(`Pasante ${pasante.id} actualizado`);
  }

}
