import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Sindrome, SindromesServices } from '../../../../../services/sindromes';
import { CommonModule } from '@angular/common';
import { Sintoma } from '../../../../../services/sintomas';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mostrar-sindromes',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './mostrar-sindromes.html',
  styleUrl: './mostrar-sindromes.css'
})
export class MostrarSindromes {
  sindromes: Sindrome[] = [];
  sindromeSeleccionado: Sindrome | null = null;
  sintomasSeleccionados: Sintoma[] = [];

  // --- Variables del modal para elegir un nuevo sindrome---
  nuevoSindrome: string = '';
  nuevoTratamiento: string = '';

  private modalInstance: bootstrap.Modal | null = null;
  @ViewChild('modalSindrome', { static: false }) modalSindromeRef!: ElementRef;

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

  ngAfterViewInit() {
    // Inicializa el modal de Bootstrap una vez que el template esté cargado
    if (this.modalSindromeRef) {
      this.modalInstance = new bootstrap.Modal(this.modalSindromeRef.nativeElement);
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

  // --- Modal con animación Bootstrap ---
  abrirModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  cerrarModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.nuevoSindrome = '';
    this.nuevoTratamiento = '';
  }

  confirmarSindrome() {
    if (!this.nuevoSindrome.trim() || !this.nuevoTratamiento.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Debes escribir tanto el síndrome como el tratamiento.',
      });
      return;
    }

    const sindromeData = { idSindrome: null, descripcion: this.nuevoSindrome };
    const tratamientoData = { idTratamiento: null, nombre: this.nuevoTratamiento, descripcion: null, puntos: null };

    localStorage.setItem('sindromeSeleccionado', JSON.stringify(sindromeData));
    localStorage.setItem('tratamientoSeleccionado', JSON.stringify(tratamientoData));

    this.cerrarModal();
    // Redirige a la pantalla de registrar puntos
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes/mostrar-tratamientos/registrar-puntos']);
  }
}


