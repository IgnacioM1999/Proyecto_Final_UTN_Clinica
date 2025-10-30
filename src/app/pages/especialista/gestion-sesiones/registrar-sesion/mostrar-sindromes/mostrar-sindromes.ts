import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Sindrome, SindromesServices } from '../../../../../services/sindromes';
import { CommonModule } from '@angular/common';
import { Sintoma } from '../../../../../services/sintomas';

@Component({
  selector: 'app-mostrar-sindromes',
  imports: [RouterLink, CommonModule],
  templateUrl: './mostrar-sindromes.html',
  styleUrl: './mostrar-sindromes.css'
})
export class MostrarSindromes {
  sindromes: Sindrome[] = [];
  sindromeSeleccionado: Sindrome | null = null;
  sintomasSeleccionados: Sintoma[] = [];

  constructor(private sindromesService: SindromesServices, private router: Router) { }

  ngOnInit(): void {

    const cuestionarioGuardado = localStorage.getItem('cuestionarioSesion');

    if (cuestionarioGuardado) {
      // Parsear el JSON y obtener el objeto
      const data = JSON.parse(cuestionarioGuardado);

      // Verificar que tenga síntomas
      if (data.sintomas && Array.isArray(data.sintomas)) {
        this.sintomasSeleccionados = data.sintomas;
        console.log('Síntomas guardados recuperados:', this.sintomasSeleccionados);
      } else {
        console.warn('No se encontraron síntomas en los datos guardados.');
        this.sintomasSeleccionados = [];
      }
    } else {
      console.warn('No se encontró la key cuestionarioSesion en localStorage.');
      this.sintomasSeleccionados = [];
    }

    //Cargar los síndromes basados en estos síntomas:
    if (this.sintomasSeleccionados.length > 0) {
      const idsSintomas = this.sintomasSeleccionados.map(s => s.idSintoma);
      this.cargarSindromes(idsSintomas);
    }
  }

  cargarSindromes(idsSintomas: number[]) {
    this.sindromesService.getSindromesPorSintomas(idsSintomas)
      .subscribe({
        next: data => {
          console.log('Síndromes recibidos:', data);
          this.sindromes = data;
        },
        error: err => console.error('Error cargando síndromes', err)
      });
  }

  seleccionarSindrome(s: Sindrome) {
    this.sindromeSeleccionado = s;
    localStorage.setItem('sindromeSeleccionado', JSON.stringify(s));
  }

  toggleSeleccion(s: Sindrome, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.sindromeSeleccionado = s;
      localStorage.setItem('sindromeSeleccionado', JSON.stringify(s));
    } else {
      this.sindromeSeleccionado = null;
      localStorage.removeItem('sindromeSeleccionado');
    }
  }


  continuar(): void {
    if (this.sindromeSeleccionado) {
      const sindromeData = {
        idSindrome: this.sindromeSeleccionado.idSindrome,
        descripcion: this.sindromeSeleccionado.descripcion
      };

      localStorage.setItem('sindromeSeleccionado', JSON.stringify(sindromeData));
      this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes/mostrar-tratamientos']);
    }
  }

    volver() {
    localStorage.removeItem('sindromeSeleccionado');
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio']);
  }

}
