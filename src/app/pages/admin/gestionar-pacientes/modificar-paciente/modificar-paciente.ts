import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modificar-paciente',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './modificar-paciente.html',
  styleUrl: './modificar-paciente.css'
})
export class ModificarPaciente {

  constructor(private router: Router){}
  
  pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];

  guardarPaciente(paciente: any) {
    console.log('Pasante guardado:', paciente);
    alert(`Paciente ${paciente.dni} actualizado`);
  }


}
