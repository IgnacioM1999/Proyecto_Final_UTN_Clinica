import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestionar-pacientes',
  imports: [RouterModule],
  templateUrl: './gestionar-pacientes.html',
  styleUrl: './gestionar-pacientes.css'
})
export class GestionarPacientes {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }

}
