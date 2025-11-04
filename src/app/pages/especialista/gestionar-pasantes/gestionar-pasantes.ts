import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-pasantes',
  imports: [RouterLink],
  templateUrl: './gestionar-pasantes.html',
  styleUrl: './gestionar-pasantes.css'
})
export class GestionarPasantesEsp {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(['/especialista'])
  }

}
