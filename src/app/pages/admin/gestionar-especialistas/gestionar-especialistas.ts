import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-especialistas',
  imports: [RouterLink],
  templateUrl: './gestionar-especialistas.html',
  styleUrl: './gestionar-especialistas.css'
})
export class GestionarEspecialistas {

    constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }

}
