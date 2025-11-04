import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Turno, TurnosServices } from '../../../services/turnos';
import { Usuario, UsuariosServices } from '../../../services/usuarios';

@Component({
  selector: 'app-gestionar-turnos-hoy',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gestionar-turnos-hoy.html',
  styleUrl: './gestionar-turnos-hoy.css'
})
export class GestionarTurnosHoy implements OnInit {

  turnos: Turno[] = []
  usuarios: Usuario[] = []
  turnosFiltrados: Turno[] = [];

  constructor(private turnosServices: TurnosServices, private usuariosServices: UsuariosServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnosServices.getEspecialistasYPacientes().subscribe({
      next: (data) => {
        this.turnos = data;
        // Obtener los turnos del especialista logueado y del día de hoy
        const usuarioGuardado = localStorage.getItem('usuario');
        if (!usuarioGuardado) {
          console.error('No se encontró el usuario en el localStorage');
          this.turnosFiltrados = [];
          return;
        }

        const usuario = JSON.parse(usuarioGuardado);
        const dniEspecialista = usuario.dniUsuario;
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split('T')[0]; //Da el formato aaaa-mm-dd

        this.turnosFiltrados = this.turnos.filter(turno => {
          const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
          return fechaTurno === fechaHoy && turno.dniEspecialista === dniEspecialista;
        });
      },
      error: (err) => console.error('Error al cargar turnos:', err)
    }
    )
  }

}
