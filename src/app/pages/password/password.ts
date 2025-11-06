import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario, UsuariosServices } from '../../services/usuarios';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './password.html',
  styleUrl: './password.css'
})

export class Password implements OnInit {

  mostrarContrasenia: boolean = false;
  usuarios: Usuario[] = [];
  dniDuplicado: boolean = false;
  nombreUsuarioDuplicado: boolean = false;
  anioActual: number = new Date().getFullYear();

  //Variables para el mensaje de exito/fracaso al registrar un pasante/paciente
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | '' = '';
  mostrarMensaje: boolean = false;

  usuario: Usuario = {
    dniUsuario: '',
    nombreYApellido: '',
    telefono: '',
    mail: '',
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: '',
    idLocalidad: 0,
    estado: 'activo'
  };

  constructor(private router: Router, private usuariosService: UsuariosServices) { }

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

  confirmar() {
    this.verificarDni(); //se hace tambien la validacion aca por si alguien hackea en el html
    if (this.dniDuplicado || this.nombreUsuarioDuplicado) {
      Swal.fire({
        icon: 'success', 
        title: 'Éxito', 
        text: 'Se ha enviado a su correo la solicitud para recuperar su contraseña',
        confirmButtonText: 'OK' 
      });
      return;
    } else {
      Swal.fire({
        icon: 'error', 
        title: 'Error',
        text: 'Verifique los campos'
      });
    }
  }

  volver() {
    this.router.navigate(['']);
  }
}