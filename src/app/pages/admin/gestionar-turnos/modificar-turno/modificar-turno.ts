import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modificar-turno',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-turno.html',
  styleUrl: './modificar-turno.css'
})
export class ModificarTurno {

  constructor(private router: Router){}
  turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Juan Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Lic. Ana Gómez' },
    { id: 3, dia: 'Miércoles', hora: '14:00', especialista: 'Dr. Carlos Rodríguez' }
  ];

  guardarTurno(turno: any) {
    console.log('Turno guardado:', turno);
    alert(`Turno ${turno.id} actualizado`);
  }

}
