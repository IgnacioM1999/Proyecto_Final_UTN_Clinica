import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Insumo, InsumosServices } from '../../../../services/insumos';

@Component({
  selector: 'app-listar-insumo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-insumo.html',
  styleUrl: './listar-insumo.css'
})
export class ListarInsumo implements OnInit{
  
  insumosBack: Insumo[]=[]
  
  constructor(private insumosService: InsumosServices){}

   ngOnInit(): void {
    this.cargarInsumos();
  }

  //Cargar insumos desde el backend
  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data) => this.insumosBack = data,
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }
}

