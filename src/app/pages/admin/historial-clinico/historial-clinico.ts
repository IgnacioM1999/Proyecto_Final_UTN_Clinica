import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial-clinico',
  imports: [CommonModule,RouterLink],
  templateUrl: './historial-clinico.html',
  styleUrl: './historial-clinico.css'
})
export class HistorialClinico {

  constructor(private router: Router){}

    pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];

  pacienteDniSeleccionado: number | null = null;

}
