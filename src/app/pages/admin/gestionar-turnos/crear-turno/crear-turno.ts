import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Turno, TurnosServices } from '../../../../services/turnos';
import { Especialista, EspecialistasServices } from '../../../../services/especialistas';
import { Usuario, UsuariosServices } from '../../../../services/usuarios';


@Component({
  selector: 'app-crear-turno',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './crear-turno.html',
  styleUrl: './crear-turno.css'
})
export class CrearTurno {
  especialistas: Usuario[] = [];
  nuevoTurno: Turno ={
    idTurno: 0,
    fecha:'', 
    horario: '',
    estado:'Disponible', //Un nuevo turno se inicializa en Disponible
    dniEspecialista: '',
    nombreEspecialista:'',
    dniPaciente: '',
    nombrePaciente:''
  };

  constructor(private turnosServices:TurnosServices, private especialistasUsuariosServices:UsuariosServices, private router: Router){}

    ngOnInit(): void {
    this.especialistasUsuariosServices.getEspecialistas().subscribe(data => {
      this.especialistas = data;  // guardamos la lista de especialistas en el arreglo
    });
  }
  guardarTurno() {
    this.turnosServices.createTurno(this.nuevoTurno).subscribe({
      next: (res) => {
        alert('Turno creado correctamente ✅');
      },
      error: (err) => {
        console.error('Error al crear turno:', err);
        alert('❌ Error al crear turno');
      }
    });
  }

  volver(){
    this.router.navigate(["/admin/gestionar-turnos"])
  }
  
}
