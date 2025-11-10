import { Component } from '@angular/core';
import { Pasante, PasantesServices } from '../../../services/pasantes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-estado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-estado.html',
  styleUrl: './ver-estado.css'
})
export class VerEstado {

  constructor(private pasantesServices: PasantesServices) { }

  categoriaPasante: string = '';
  horasPasante: number = 0;
  pasante: Pasante | null = null;

  ngOnInit(): void {
    this.cargarPasante();
  }

  cargarPasante() {
    const usuarioData = localStorage.getItem('usuario');
    if (!usuarioData) {
      console.error('No se encontró información del usuario en localStorage');
      return;
    }

    const usuario = JSON.parse(usuarioData);    //Transforma la cadena JSON en el objeto Usuario
    const dniPasante = usuario.dniUsuario;

    if (!dniPasante) {
      console.error('El usuario no tiene DNI definido');
      return;
    }

    this.pasantesServices.getPasante(dniPasante).subscribe({
      next: (data: Pasante) => {
        this.categoriaPasante = data.categoria;
        this.horasPasante = data.horasPasante;
        //Si el pasante alcanzó o superó las 525 horas y aún no fue marcado como Finalizado
        if (this.categoriaPasante == 'Finalizado') {

          Swal.fire({
            icon: 'success',
            title: '¡Felicidades!',
            text: 'Has completado las 525 horas de prácticas supervisadas.',
            confirmButtonColor: '#198754'
          });
        }
      },
      error: (err) => console.error('Error al cargar el pasante:', err)
    });
  }

}
