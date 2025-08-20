import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-paciente',
  imports: [RouterLink],
  templateUrl: './crear-paciente.html',
  styleUrl: './crear-paciente.css'
})
export class CrearPaciente {

  constructor(private router: Router){}

}
