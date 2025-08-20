import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-eliminar-paciente',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './eliminar-paciente.html',
  styleUrl: './eliminar-paciente.css'
})
export class EliminarPaciente {

  constructor(private router: Router){}
  
  pacientes = [
    {dni: 16889123, usuario: 'Alex1', nombreYapellido: 'Alexis Rodriguez', email:'alex@gmail.com', contrasenia: '523'},
    {dni: 20555333, usuario: 'MariB', nombreYapellido: 'Maria Benjamin', email:'mariab@gmail.com', contrasenia: 'ppp'},
    {dni: 37009008, usuario: 'JoseM', nombreYapellido: 'Josefina Martinez', email:'jo22@gmail.com', contrasenia: 'adios'},
  ];

  eliminarPaciente(dni: number) {
    if (confirm('¿Seguro que deseas eliminar este pasante?')) {
      this.pacientes = this.pacientes.filter(t => t.dni !== dni); //.filter() recorre cada elemento (t) y devuelve un nuevo arreglo 
                                                          //solo con los elementos cuyo id sea distinto del id que queremos eliminar.
    }
  }

}
