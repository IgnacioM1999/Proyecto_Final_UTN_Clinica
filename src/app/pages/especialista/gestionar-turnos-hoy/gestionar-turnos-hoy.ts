import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Turno, TurnosServices } from '../../../services/turnos';
import { Usuario, UsuariosServices } from '../../../services/usuarios';

@Component({
  selector: 'app-gestionar-turnos-hoy',
  standalone:true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gestionar-turnos-hoy.html',
  styleUrl: './gestionar-turnos-hoy.css'
})
export class GestionarTurnosHoy implements OnInit {

    turnos: Turno[]= []
    usuarios: Usuario[]= []
    turnosFiltrados: Turno[] = []; 
  
    constructor(private turnosServices: TurnosServices, private usuariosServices: UsuariosServices){}
  
    ngOnInit(): void {
      this.cargarTurnos();
    }
  
    cargarTurnos(): void{
      this.turnosServices.getEspecialistasYPacientes().subscribe({
        next: (data) =>{
          this.turnos = data;
          this.turnosFiltrados = [...this.turnos]; // inicializa con todos los turnos
        },
        error: (err) => console.error('Error al cargar turnos:', err)
      }
      )
    }

}
