import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-especialista',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './crear-especialista.html',
  styleUrl: './crear-especialista.css'
})
export class CrearEspecialista {

  usuario: Usuario = {
    dniUsuario: '',
    nombreYApellido: '',
    telefono: '',
    mail: '',
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: 'especialista',
    idLocalidad: 0,
    estado: 'activo'
  };

  especialista: Especialista = {
    dniEspecialista: '',
    nombreYApellido: '',
    telefono: '',
    mail: '',
    nombreUsuario: '',
    contrasenia:'',
    horasSupervisor: 0,
    titulos: ''
  };

  mostrarContrasenia: boolean = false;
  usuarios: Usuario[] = [];
  dniDuplicado: boolean = false;
  nombreUsuarioDuplicado: boolean = false;
  anioActual: number = new Date().getFullYear();

  //Variables para el mensaje de exito/fracaso al registrar un pasante/paciente
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | '' = '';
  mostrarMensaje: boolean = false;

  constructor(private usuariosService: UsuariosServices, private especialistaService: EspecialistasServices, private router: Router) { }

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

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }

  registrar(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos requeridos antes de continuar.'
      });
      return;
    }
    this.verificarDni(); //se hace tambien la validacion aca por si alguien hackea en el html
    if (this.dniDuplicado || this.nombreUsuarioDuplicado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar, revise los campos.'
      });
      return;
    } else {
      const data = {
        usuario: this.usuario,
        especialista: this.especialista
      };
      this.especialistaService.createEspecialista(data).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario registrado con éxito 🎉',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}