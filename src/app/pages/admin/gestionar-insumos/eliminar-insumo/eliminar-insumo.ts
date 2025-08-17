import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-eliminar-insumo',
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar-insumo.html',
  styleUrl: './eliminar-insumo.css'
})
export class EliminarInsumo {

  constructor(private router: Router){}

    insumos = [
    { id: 1, nombre: 'Agujas de acupuntura', descripcion: 'Agujas estériles desechables para sesiones de acupuntura', cantidad:200},
    { id: 2, nombre: 'Moxa', descripcion: 'Bastones de artemisa seca para terapia de moxibustión', cantidad:500  },
    { id: 3, nombre: 'Ventosas', descripcion: 'Juego de ventosas de vidrio y plástico para terapia de succión', cantidad: 70},
  ];

  eliminarInsumo(id: number) {
    if (confirm('¿Seguro que deseas eliminar este turno?')) {
      this.insumos = this.insumos.filter(i => i.id !== id); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
                                                          //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
