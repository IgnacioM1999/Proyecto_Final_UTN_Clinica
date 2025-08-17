import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-insumo',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-insumo.html',
  styleUrl: './listar-insumo.css'
})
export class ListarInsumo {

    constructor(private router: Router){}

   insumos = [
    { id: 1, nombre: 'Agujas de acupuntura', descripcion: 'Agujas estériles desechables para sesiones de acupuntura', cantidad:200},
    { id: 2, nombre: 'Moxa', descripcion: 'Bastones de artemisa seca para terapia de moxibustión', cantidad:500  },
    { id: 3, nombre: 'Ventosas', descripcion: 'Juego de ventosas de vidrio y plástico para terapia de succión', cantidad: 70},
  ];

}
