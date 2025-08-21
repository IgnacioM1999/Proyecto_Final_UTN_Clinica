import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-especialista',
  imports: [RouterLink],
  templateUrl: './crear-especialista.html',
  styleUrl: './crear-especialista.css'
})
export class CrearEspecialista {

  constructor(private router:Router){}

}
