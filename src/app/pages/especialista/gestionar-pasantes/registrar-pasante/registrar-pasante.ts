import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Pasante, PasantesServices } from '../../../../services/pasantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-pasante',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registrar-pasante.html',
  styleUrl: './registrar-pasante.css'
})
export class RegistrarPasanteEsp implements OnInit {
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
    tipoUsuario: 'pasante',
    idLocalidad: 0,
    estado: 'activo'
  };

  pasante: Pasante = {
    dniPasante: '',
    horasPasante: 0,
    institucion: '',
    mesInicio: '',
    anioInicio: 0,
    docente: '',
    mailDocente: '',
    categoria: 'Pasante'
  };

  constructor(private pasantesService: PasantesServices, private router: Router, private usuariosService: UsuariosServices) { }

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

  registrar(form: NgForm) {
    this.verificarDni(); //se hace tambien la validacion aca por si alguien hackea en el html
    //this.usuario.tipoUsuario === 'pasante'
    const data = {
      usuario: this.usuario,
      pasante: this.pasante
    };
    this.pasantesService.createPasante(data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Pasante registrado con éxito 🎉',
          confirmButtonText: 'OK'
        }).then(() => {
          //Limpia todos los campos del formulario
          form.resetForm();
          this.usuario.tipoUsuario = 'pasante';
          this.pasante.categoria = 'Pasante';
          this.usuario.estado = 'activo';
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar, revise los campos.'
        });
      }
    });
  }

  volver() {
    this.router.navigate(['/especialista/gestionar-pasantes']);
  }

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }

}
