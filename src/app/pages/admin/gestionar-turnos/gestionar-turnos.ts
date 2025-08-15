import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionar-turnos',
  imports: [RouterModule],
  templateUrl: './gestionar-turnos.html',
  styleUrl: './gestionar-turnos.css'
})
export class GestionarTurnos {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }

}
