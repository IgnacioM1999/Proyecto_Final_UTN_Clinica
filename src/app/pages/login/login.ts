import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario, UsuariosServices } from '../../services/usuarios';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario?: string;
  password?: string;
  remember: boolean = false;
  errorMessage: string = '';

  constructor(private usuariosService: UsuariosServices, private router: Router) { }

  onSubmit() {
    this.usuariosService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      const user = usuarios.find(u => u.nombreUsuario === this.usuario && u.contrasenia === this.password);

      if (user) {
        this.errorMessage = '';

        //Guardo el nombreUsuario y la contraseña en el localStorage, propiedad de un navegador web que 
        //permite almacenar pares de clave-valor en el navegador del usuario, de forma persistente y local
        localStorage.setItem('usuario', JSON.stringify(user));
        
        switch (user.tipoUsuario) {
          case 'administrador':
            this.router.navigate(['/admin']);
            break;
          case 'paciente':
            this.router.navigate(['/paciente']);
            break;
          case 'pasante':
            this.router.navigate(['/pasante']);
            break;
          case 'especialista':
            this.router.navigate(['/especialista']);
            break;
          default:
            this.router.navigate(['/']); // Por si no coincide con ninguno
            break;
        }
        //this.router.navigate(['/home']);  redirigir donde quieras
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); // <- ruta hacia el componente de registro
  }

  onInputChange() { //Para limpiar el mensaje de usuario y contrasela incorrectos al volver a escribir
    this.errorMessage = '';
  }

}
