import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestionar-insumos',
  imports: [RouterModule],
  templateUrl: './gestionar-insumos.html',
  styleUrl: './gestionar-insumos.css'
})
export class GestionarInsumos {

    constructor(private router: Router){}

  volver(){
    this.router.navigate(["/admin"])
  }

}
