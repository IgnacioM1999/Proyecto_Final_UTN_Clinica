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
    const { mail, nombreUsuario } = this.usuario;

    if (!mail.trim() || !nombreUsuario.trim()) {
      Swal.fire('Campos incompletos', 'Debe ingresar el mail y el nombre de usuario.', 'warning');
      return;
    }
    /*this.usuariosService.enviarLinkRecuperacion(mail, nombreUsuario).subscribe({
      next: (response: any) => {
        // Si la respuesta viene como texto, simplemente mostramos éxito
        Swal.fire('Correo enviado', 'Revisa tu correo para recuperar la contraseña.', 'success');
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire('Error', 'No se encontró un usuario con esos datos.', 'error');
        } else {
          Swal.fire('Error', 'No se pudo enviar el correo.', 'error');
        }
      }
    });*/

    /**/this.usuariosService.getUsuarioPorMailYNombreUsuario(mail, nombreUsuario).subscribe({
      next: (usuarioEncontrado) => {
        if (usuarioEncontrado && usuarioEncontrado.contrasenia) {
          Swal.fire({
            icon: 'info',
            title: 'Contraseña recuperada',
            html: `<strong>Su contraseña es:</strong> <span style="font-size: 18px;">${usuarioEncontrado.contrasenia}</span>`,
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró un usuario con esos datos.'
          });
        }
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'Verifique los datos ingresados.'
          });
        } else {
          console.error('Error al buscar usuario:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'Ocurrió un problema al intentar recuperar la contraseña.'
          });
        }
      }
    });/**/
  }

  volver() {
    this.router.navigate(['']);
  }
}