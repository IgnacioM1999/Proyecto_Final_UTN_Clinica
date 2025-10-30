import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tratamiento, TratamientosServices } from '../../../../../services/tratamientos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-tratamientos',
  imports: [RouterLink, CommonModule],
  templateUrl: './mostrar-tratamientos.html',
  styleUrl: './mostrar-tratamientos.css'
})
export class MostrarTratamientos implements OnInit {

  tratamientos: Tratamiento[] = [];
  tratamientoSeleccionado: Tratamiento | null = null;
  idSindrome: number = 0;
  descripcionSindrome: string = '';

  constructor(private tratamientosService: TratamientosServices, private router: Router) { }

  ngOnInit(): void {
    const sindromeDataString = localStorage.getItem('sindromeSeleccionado');
    if (sindromeDataString) {
      const sindromeData = JSON.parse(sindromeDataString);
      this.idSindrome = sindromeData.idSindrome;
      this.descripcionSindrome = sindromeData.descripcion;
      this.cargarTratamientos();
    }
  }

  cargarTratamientos(): void {
    this.tratamientosService.getTratamientos(this.idSindrome).subscribe({
      next: (data) => this.tratamientos = data,
      error: (err) => console.error('Error cargando tratamientos:', err)
    });
  }

  onCheckboxChange(tratamiento: Tratamiento, event: any): void {
    if (event.target.checked) {
      this.tratamientoSeleccionado = tratamiento;
    } else {
      this.tratamientoSeleccionado = null;
    }
  }

  continuar(): void {
    if (this.tratamientoSeleccionado) {
      localStorage.setItem('tratamientoSeleccionado', JSON.stringify(this.tratamientoSeleccionado));
      this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes/mostrar-tratamientos/registrar-puntos']); // Ajustá la ruta según corresponda
    }
  }

  volver() {
    localStorage.removeItem('tratamientoSeleccionado');
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes']);
  }

  //Se pone el get porque se está creando una propiedad calculada. Esto permite usar el metodo en el HTML sin paréntesis.
  //Se recalcula automáticamente cada vez que cambian las variables que usa.
  get botonDeshabilitado(): boolean {
    return this.tratamientoSeleccionado === null;
  }

}
