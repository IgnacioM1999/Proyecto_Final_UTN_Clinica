import { Component } from '@angular/core';
import { Pasante, PasantesServices } from '../../../services/pasantes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Sesion, SesionesServices } from '../../../services/sesiones';

@Component({
  selector: 'app-ver-estado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-estado.html',
  styleUrl: './ver-estado.css'
})
export class VerEstado {

  constructor(private pasantesServices: PasantesServices, private sesionesServices:SesionesServices) { }

  categoriaPasante: string = '';
  horasPasante: number = 0;
  faltanteHoras: number = 0;
  faltanteMinutos: number = 0;
  pasante: Pasante | null = null;

 totalAcumulado: string = '00:00:00';

  faltanteSegundos: number = 0;
  faltanteHH: number = 0;
  faltanteMM: number = 0;
  faltanteSS: number = 0;

  private readonly TOTAL_525_HS_EN_SEG = 525 * 3600;

  ngOnInit(): void {
    this.cargarPasante();
  }

  cargarPasante() {
    const usuarioData = localStorage.getItem('usuario');
    if (!usuarioData) {
      console.error('No se encontró información del usuario en localStorage');
      return;
    }

    const usuario = JSON.parse(usuarioData);    //Transforma la cadena JSON en el objeto Usuario
    const dniPasante = usuario.dniUsuario;

    if (!dniPasante) {
      console.error('El usuario no tiene DNI definido');
      return;
    }

    this.pasantesServices.getPasante(dniPasante).subscribe({
      next: (data: Pasante) => {
        this.categoriaPasante = data.categoria;

        // 1) Cargar sesiones y sumar horas reales
        this.cargarSesiones(dniPasante);
             if (data.categoria === 'Finalizado') {
          Swal.fire({
            icon: 'success',
            title: '¡Felicidades!',
            text: 'Has completado las 525 horas de prácticas supervisadas.',
            confirmButtonColor: '#198754'
          });
        }
      },
      error: (err) => console.error('Error al cargar el pasante:', err)
    });
  }

   cargarSesiones(dni: string) {
    this.sesionesServices.getSesionesPasante(dni).subscribe({
      next: sesiones => {
       const totalSegundos = this.sumatoriaDuraciones(sesiones);

        this.totalAcumulado = this.convertirSegundosA_HHMMSS(totalSegundos);

        this.faltanteSegundos = this.TOTAL_525_HS_EN_SEG - totalSegundos;

        if (this.faltanteSegundos > 0) {
          const falt = this.convertirSegundos(this.faltanteSegundos);
          this.faltanteHH = falt.horas;
          this.faltanteMM = falt.minutos;
          this.faltanteSS = falt.segundos;
        } else {
          this.faltanteSegundos = 0;
        }
      }
    });
  }

  // Suma duraciones tipo "HH:MM:SS"
  sumatoriaDuraciones(sesiones: Sesion[]) {
    let total = 0;

    sesiones.forEach(s => {
      if (s.duracionSesion) {
        const [h, m, sgs] = s.duracionSesion.split(':').map(Number);
        total += h * 3600 + m * 60 + sgs;
      }
    });

    return total;
  }

  // Convierte segundos → objeto
  convertirSegundos(seg: number) {
    const horas = Math.floor(seg / 3600);
    seg %= 3600;
    const minutos = Math.floor(seg / 60);
    const segundos = seg % 60;
    return { horas, minutos, segundos };
  }

  // Convierte segundos → "HH:MM:SS"
  convertirSegundosA_HHMMSS(totalSeg: number) {
    const h = Math.floor(totalSeg / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeg % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeg % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

}
