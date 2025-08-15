import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-crear-turno',
  imports: [RouterModule],
  templateUrl: './crear-turno.html',
  styleUrl: './crear-turno.css'
})
export class CrearTurno {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin/gestionar-turnos"])
  }
  
}
