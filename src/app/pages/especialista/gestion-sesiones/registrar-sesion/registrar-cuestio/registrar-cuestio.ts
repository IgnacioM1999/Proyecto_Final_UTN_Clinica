import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sintoma, SintomasServices } from '../../../../../services/sintomas';
import { Sesion, SesionesServices } from '../../../../../services/sesiones';

@Component({
  selector: 'app-registrar-cuestio',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './registrar-cuestio.html',
  styleUrl: './registrar-cuestio.css'
})
export class RegistrarCuestio implements OnInit {

  sesiones: Sesion[] = [];
  sintomas: Sintoma[] = [];
  descripcion: string = '';
  antecedentes = {
    personales: '',
    familiares: '',
    quirurgicos: ''
  };
  dniPaciente!: string;
  dniPasante!: string | null;
  dniEspecialista!: string;
  puedeContinuar: boolean = false;
  hoy: string = new Date().toISOString().split('T')[0];
  errorRangoMolestia: boolean = false;


  constructor(
    private router: Router,
    private sesionesService: SesionesServices,
    private sintomasServices: SintomasServices
  ) { }

  ngOnInit(): void {
    const seleccionSesion = localStorage.getItem('seleccionSesion');
    if (seleccionSesion) {
      const seleccion = JSON.parse(seleccionSesion);
      this.dniPaciente = seleccion.dniPaciente;
      this.dniPasante = seleccion.dniPasante;
      this.dniEspecialista = seleccion.dniEspecialista;
    }
    // Obtener síntomas
    this.sintomasServices.getSintomas().subscribe((data) => {
      this.sintomas = data;
      this.verificarContinuar();
    });
  }

  // Cuando se cambia nivel o fecha de un síntoma
  onSintomaChange(): void {
    this.guardarTemporal();
    this.verificarContinuar();
  }

  // Guardar todo temporalmente en localStorage
  guardarTemporal(): void {
    const seleccionados = this.sintomas
      .filter(s => s.nivelMolestia || s.fechaInicioSintoma)
      .map(s => ({
        idSintoma: s.idSintoma,
        nivelMolestia: s.nivelMolestia,
        fechaInicioSintoma: s.fechaInicioSintoma
      }));

    const dataEtapa2 = {
      dniPaciente: this.dniPaciente,
      sintomas: seleccionados,
      descripcion: this.descripcion,
      antecedentes: this.antecedentes
    };

    localStorage.setItem('cuestionarioSesion', JSON.stringify(dataEtapa2));

    this.verificarContinuar();
  }

  verificarRango(sintoma: Sintoma): void {
    const nivel = sintoma.nivelMolestia ?? 0;
    this.errorRangoMolestia = nivel < 1 || nivel > 10;
    this.verificarContinuar(); 
  }


  // Verifica si hay al menos un síntoma completo + descripción cargada
  verificarContinuar(): void {
    const haySintomaCompleto = this.sintomas.some(
      s => s.nivelMolestia && s.fechaInicioSintoma
    );
    this.puedeContinuar = haySintomaCompleto && this.descripcion.trim() !== '' &&!this.errorRangoMolestia;
  }

  continuar(): void {
    // Guarda lo actual antes de avanzar
    this.guardarTemporal();
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes']);
  }

  volver() {
    localStorage.removeItem('cuestionarioSesion');
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion']);
  }
}
