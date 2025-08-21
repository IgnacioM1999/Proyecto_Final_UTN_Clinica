import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-eliminar-especialista',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './eliminar-especialista.html',
  styleUrl: './eliminar-especialista.css'
})
export class EliminarEspecialista {

  constructor(private router: Router) { }

  especialistas = [
    { legajo: 1, usuario: 'Robert!', nombreYapellido: 'Roberto Melendez', email: 'roberto@gmail.com', contrasenia: '123' },
    { legajo: 2, usuario: 'Pablo3', nombreYapellido: 'Pablo Hernandez', email: 'pablo@gmail.com', contrasenia: '456' },
    { legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email: 'martin@gmail.com', contrasenia: 'hola' },
  ];

  eliminarEspecialista(legajo: number) {
    if (confirm('¿Seguro que deseas eliminar este especialista?')) {
      this.especialistas = this.especialistas.filter(t => t.legajo !== legajo); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
      //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
