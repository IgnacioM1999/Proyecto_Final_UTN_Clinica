import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modificar-especialista',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-especialista.html',
  styleUrl: './modificar-especialista.css'
})
export class ModificarEspecialista {

    constructor(private router: Router){}
  
  especialistas = [
    {legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email:'roberto@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email:'pablo@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
  ];

  guardarEspecialista(especialista: any) {
    console.log('Especialista guardado:', especialista);
    alert(`Especialista ${especialista.id} actualizado`);
  }

}
