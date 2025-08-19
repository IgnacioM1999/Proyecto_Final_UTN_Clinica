import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-eliminar-pasante',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './eliminar-pasante.html',
  styleUrl: './eliminar-pasante.css'
})
export class EliminarPasante {

  constructor(private router: Router){}

    pasantes = [
    {legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email:'nico@gmail.com', contrasenia: '123'},
    {legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email:'vale@gmail.com', contrasenia: '456'},
    {legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email:'martin@gmail.com', contrasenia: 'hola'},
  ];

    eliminarPasante(legajo: number) {
    if (confirm('¿Seguro que deseas eliminar este pasante?')) {
      this.pasantes = this.pasantes.filter(t => t.legajo !== legajo); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
                                                          //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
