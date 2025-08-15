import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-eliminar-turno',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './eliminar-turno.html',
  styleUrl: './eliminar-turno.css'
})
export class EliminarTurno {
  constructor(private router:Router){}

  turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Dra. Gómez' },
    { id: 3, dia: 'Viernes', hora: '14:00', especialista: 'Dr. López' }
  ];

  eliminarTurno(id: number) {
    if (confirm('¿Seguro que deseas eliminar este turno?')) {
      this.turnos = this.turnos.filter(t => t.id !== id); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
                                                          //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
