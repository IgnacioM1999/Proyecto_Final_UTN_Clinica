import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-insumo',
  imports: [RouterLink],
  templateUrl: './crear-insumo.html',
  styleUrl: './crear-insumo.css'
})
export class CrearInsumo {

  constructor(private router: Router){}

}
