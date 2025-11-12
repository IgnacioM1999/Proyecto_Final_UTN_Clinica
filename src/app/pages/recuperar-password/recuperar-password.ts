import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario, UsuariosServices } from '../../services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.css'
})
export class RecuperarPassword implements OnInit {

  token: string = '';
  nuevaPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosServices
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';

      
      if (!this.token) {
        Swal.fire('Error', 'El enlace no es válido o ha expirado.', 'error');
        this.router.navigate(['/password']);
        return;
      }

      // Llamada al backend para validar token
      this.usuariosService.validarToken(this.token).subscribe({
        next: () => {
          console.log('Token válido');
        },
        error: (err) => {
          console.error('Error al validar token:', err);
          Swal.fire('Error', 'El enlace no es válido o ha expirado.', 'error');
          this.router.navigate(['/password']);
        }
      });
    });
  }

  confirmar() {
  if (!this.nuevaPassword || this.nuevaPassword.trim().length < 4) {
    Swal.fire('Advertencia', 'La contraseña debe tener al menos 4 caracteres.', 'warning');
    return;
  }

  this.usuariosService.actualizarPassword(this.token, this.nuevaPassword).subscribe({
    next: (response: any) => {
      Swal.fire('Éxito', response.message || 'La contraseña se cambió correctamente.', 'success')
        .then(() => {
          this.router.navigate(['/']); // vuelve al login
        });
    },
    error: (err) => {
      if (err.status === 404) {
        Swal.fire('Error', 'El enlace ha expirado o no es válido.', 'error');
        this.router.navigate(['/password']);
      } else if (err.status === 400) {
        Swal.fire('Error', 'Faltan datos para actualizar la contraseña.', 'error');
      } else {
        Swal.fire('Error', 'No se pudo cambiar la contraseña. Intenta nuevamente.', 'error');
      }
    }
  });
  }

  volver() {
    this.router.navigate(['']);
  }

}
