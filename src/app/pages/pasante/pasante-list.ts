import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasanteService, Pasante } from './pasante.service';

@Component({
  selector: 'app-pasante-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pasante-list.html'
})
export class PasanteList {
  pasantes: Pasante[] = [];

  constructor(private pasanteService: PasanteService) {
    this.pasanteService.pasantes$.subscribe(data => {
      this.pasantes = data;
    });
  }

  eliminarPasante(legajo: string) {
    if (confirm(`¿Seguro que querés eliminar al pasante con legajo ${legajo}?`)) {
      this.pasanteService.deletePasante(legajo);
    }
  }
}
