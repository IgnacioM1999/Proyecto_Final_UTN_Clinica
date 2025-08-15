import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-turno',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-turno.html',
  styleUrl: './listar-turno.css'
})
export class ListarTurno {

  constructor(private router:Router){}

    turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Dra. Gómez' },
    { id: 3, dia: 'Viernes', hora: '14:00', especialista: 'Dr. López' }
  ];

}
