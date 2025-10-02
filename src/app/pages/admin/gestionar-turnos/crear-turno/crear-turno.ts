import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Turno, TurnosServices } from '../../../../services/turnos';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-turno',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './crear-turno.html',
  styleUrl: './crear-turno.css'
})
export class CrearTurno {
  especialistas: Usuario[] = [];
  nuevoTurno: Turno = {
    idTurno: 0,
    fecha: '',
    horario: '',
    estado: 'Disponible', //Un nuevo turno se inicializa en Disponible
    dniEspecialista: '',
    nombreEspecialista: '',
    dniPaciente: '',
    nombrePaciente: ''
  };

  constructor(private turnosServices: TurnosServices, private especialistasUsuariosServices: UsuariosServices, private router: Router) { }

  ngOnInit(): void {
    this.especialistasUsuariosServices.getEspecialistas().subscribe(data => {
      this.especialistas = data;  // guardamos la lista de especialistas en el arreglo
    });
  }
  guardarTurno() {
    this.turnosServices.createTurno(this.nuevoTurno).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Turno registrado con éxito 🎉',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al crear turno:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el turno, revise los campos.'
        });
      }
    });
  }

  volver() {
    this.router.navigate(["/admin/gestionar-turnos"])
  }

}
