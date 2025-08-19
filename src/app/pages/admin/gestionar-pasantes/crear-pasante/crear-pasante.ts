import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-pasante',
  imports: [RouterLink],
  templateUrl: './crear-pasante.html',
  styleUrl: './crear-pasante.css'
})
export class CrearPasante {

  constructor(private router:Router){}
}
