import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Turno, TurnosServices } from '../../../../services/turnos';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';

@Component({
  selector: 'app-listar-turno',
  standalone:true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-turno.html',
  styleUrl: './listar-turno.css'
})
export class ListarTurno implements OnInit {

  turnos: Turno[]= []
  usuarios: Usuario[]= []

  constructor(private turnosServices: TurnosServices, private usuariosServices: UsuariosServices){}

    /*turnos = [
    { id: 1, dia: 'Lunes', hora: '09:00', especialista: 'Dr. Pérez' },
    { id: 2, dia: 'Martes', hora: '10:30', especialista: 'Dra. Gómez' },
    { id: 3, dia: 'Viernes', hora: '14:00', especialista: 'Dr. López' }
  ];*/

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void{
    this.turnosServices.getEspecialistasYPacientes().subscribe({
      next: (data) => this.turnos = data,
      error: (err) => console.error('Error al cargar turnos:', err)
    }
    )
  }

}
