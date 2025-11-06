import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuariosServices } from '../../services/usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paciente, PacientesServices } from '../../services/pacientes';
import { Pasante, PasantesServices } from '../../services/pasantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  mostrarContrasenia: boolean = false;
  usuarios: Usuario[] = [];
  dniDuplicado: boolean = false;
  nombreUsuarioDuplicado: boolean = false;
  //anioActual: number = new Date().getFullYear();

  //Variables para el mensaje de exito/fracaso al registrar un pasante/paciente
  /*mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | '' = '';
  mostrarMensaje: boolean = false;*/

  usuario: Usuario = {
    dniUsuario: '',
    nombreYApellido: '',
    telefono: '',
    mail: '',
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: 'paciente',
    idLocalidad: 0,
    estado: 'activo'
  };

  paciente: Paciente = {
    dniPaciente: '',
    obraSocial: '',
    fechaNacimiento: '',
    sexo: ''
  };

  constructor(private pacientesService: PacientesServices, private router: Router, private usuariosService: UsuariosServices) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al traer usuarios', err)
    });
  }

  verificarDni(): void {
    if (this.usuario.dniUsuario) {
      this.dniDuplicado = this.usuarios.some(
        (u) => u.dniUsuario == this.usuario.dniUsuario
      );
    } else {
      this.dniDuplicado = false;
    }
  }

  verificarNombreUsuario(): void {
    if (this.usuario.nombreUsuario) {
      this.nombreUsuarioDuplicado = this.usuarios.some(
        (u) => u.nombreUsuario == this.usuario.nombreUsuario
      );
    } else {
      this.nombreUsuarioDuplicado = false;
    }
  }

  registrar() {
    this.verificarDni(); //se hace tambien la validacion aca por si alguien hackea en el html
    if (this.dniDuplicado || this.nombreUsuarioDuplicado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar, revise los campos.'
      });
      return;
    }
    // Combino usuario + paciente en un solo objeto
    const data = {
      usuario: this.usuario,
      paciente: this.paciente
    };
    this.pacientesService.createPaciente(data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Paciente registrado con éxito',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al crear paciente:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar, revise los campos.'
        });
      }
    });
  }

  volver() {
    this.router.navigate(['']);
  }

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }

}
