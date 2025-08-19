import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestionar-pasantes',
  imports: [RouterModule],
  templateUrl: './gestionar-pasantes.html',
  styleUrl: './gestionar-pasantes.css'
})
export class GestionarPasantes {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }

}
