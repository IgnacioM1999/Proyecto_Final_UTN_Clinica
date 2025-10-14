import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../services/usuarios';


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink],
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
    estado:''
  };

  rutaInicio: string = '/';
  constructor(private router: Router) {}

  ngOnInit(): void {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      this.usuario = JSON.parse(datos);

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

  cerrarSesion(): void {
    localStorage.removeItem('usuario'); // Limpia los datos del usuario
    this.router.navigate(['/login']);   // Redirige al login
  }

}
