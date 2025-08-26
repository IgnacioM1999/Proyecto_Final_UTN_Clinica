import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-sesiones',
  imports: [RouterLink],
  templateUrl: './gestionar-sesiones.html',
  styleUrl: './gestionar-sesiones.css'
})
export class GestionarSesiones {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }


}
