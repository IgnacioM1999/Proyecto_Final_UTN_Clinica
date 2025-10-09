import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pasante, PasantesServices } from '../../../../services/pasantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-pasante',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-pasante.html',
  styleUrl: './modificar-pasante.css'
})
export class ModificarPasante implements OnInit {
  /*pasantes = [
    { legajo: 1, usuario: 'Nico', nombreYapellido: 'Nicolas Rodriguez', email: 'nico@gmail.com', contrasenia: '123' },
    { legajo: 2, usuario: 'Vale99', nombreYapellido: 'Valentina Rojo', email: 'vale@gmail.com', contrasenia: '456' },
    { legajo: 3, usuario: 'Marti1', nombreYapellido: 'Martin Martinez', email: 'martin@gmail.com', contrasenia: 'hola' },
  ];*/

  pasantes: Pasante[] =[];

  constructor(private pasantesServices: PasantesServices) { }

  ngOnInit(): void {
    this.cargarPasantes();
  }

  cargarPasantes(): void {
    this.pasantesServices.getPasantes().subscribe({
      next: (data) => this.pasantes = data,
      error: (err) => console.error('Error al cargar pasantes:', err)
    });
  }

  guardarPasantes(pasante: any): void {
    //Armar los objetos usuario y pasante igual que en el backend
    const data = {
      usuario: {
        dniUsuario: pasante.dniEspecialista,
        nombreYApellido: pasante.nombreYApellido,
        telefono: pasante.telefono,
        mail: pasante.mail,
        nombreUsuario: pasante.nombreUsuario,
        contrasenia: pasante.contrasenia,
      },
      pasante: {
        dniPasante: pasante.dniPaciente,
        horasPasante: pasante.horasPasante,
        institucion: pasante.institucion,
        mesInicio: pasante.mesInicio,
        anioInicio: pasante.anioInicio,
        docente: pasante.docente,
        mailDocente: pasante.mailDocente,
        categoria: pasante.categoria
      }
    };

    //Llamar al servicio para actualizar
    this.pasantesServices.updatePasantes(pasante.dniPasante, data).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Pasante actualizado',
          text: `El paciente ${pasante.nombreYApellido} fue actualizado correctamente.`,
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error al actualizar pasante:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al intentar guardar los cambios.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
