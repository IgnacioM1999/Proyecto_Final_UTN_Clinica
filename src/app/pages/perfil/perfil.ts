import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario, UsuariosServices } from '../../services/usuarios';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  usuario: Usuario = {
    dniUsuario: '',
    nombreYApellido: '',
    telefono: '',
    mail: '',
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: '',
    idLocalidad: 0,
    estado: ''
  };

  contraseniaActual: string='';
  nuevaContrasenia: string = '';
  verificarContrasenia: string = '';
  rutaInicio: string = '/';

  // controlan si se muestra o no la contraseña en cada input
  mostrarActual: boolean = false;
  mostrarNueva: boolean = false;
  mostrarVerificar: boolean = false;

  constructor(private router: Router, private usuariosService: UsuariosServices) { }

  ngOnInit(): void {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      this.usuario = JSON.parse(datos);
      this.contraseniaActual = this.usuario.contrasenia;

      // Definir la ruta según el tipo de usuario
      switch (this.usuario.tipoUsuario) {
        case 'administrador':
          this.rutaInicio = '/admin';
          break;
        case 'pasante':
          this.rutaInicio = '/pasante';
          break;
        case 'paciente':
          this.rutaInicio = '/paciente';
          break;
        case 'especialista':
          this.rutaInicio = '/especialista';
          break;
        default:
          this.rutaInicio = '/';
          break;
      }
    }
  }

  guardarNuevaContrasenia() {
    if (!this.nuevaContrasenia.trim() || !this.verificarContrasenia.trim()) {
      Swal.fire('Campos incompletos', 'Por favor complete ambos campos.', 'warning');
      return;
    }

    if (this.nuevaContrasenia === this.usuario.contrasenia) {
      Swal.fire('Contraseña repetida', 'La nueva contraseña no puede ser igual a la actual.', 'warning');
      return;
    }

    if (this.nuevaContrasenia !== this.verificarContrasenia) {
      Swal.fire('No coinciden', 'Las contraseñas ingresadas no coinciden.', 'error');
      return;
    }

    this.usuariosService.actualizarContrasenia(this.usuario.dniUsuario, this.nuevaContrasenia).subscribe({
      next: () => {
        Swal.fire('Éxito', 'La contraseña fue actualizada correctamente.', 'success');
        this.usuario.contrasenia = this.nuevaContrasenia;
        localStorage.setItem('usuario', JSON.stringify(this.usuario)); // Actualiza el localStorage
        this.nuevaContrasenia = '';
        this.verificarContrasenia = '';
      },
      error: (err) => {
        console.error('Error al actualizar contraseña:', err);
        Swal.fire('Error', 'Ocurrió un error al actualizar la contraseña.', 'error');
      }
    });
  }
  cerrarSesion(): void {
    localStorage.removeItem('usuario'); // Limpia los datos del usuario
    this.router.navigate(['/login']);   // Redirige al login
  }

}
