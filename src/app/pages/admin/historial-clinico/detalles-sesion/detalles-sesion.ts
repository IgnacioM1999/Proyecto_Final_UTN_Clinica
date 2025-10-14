import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';

@Component({
  selector: 'app-detalles-sesion',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalles-sesion.html',
  styleUrl: './detalles-sesion.css'
})
export class DetallesSesion implements OnInit {

  dniPaciente: string = ''
  sesion: Sesion | null = null;
  sintomas: string[] = [];
  constructor(private route: ActivatedRoute, private sesionesServices: SesionesServices) { }

  ngOnInit(): void {
    // Capturamos el parámetro de la URL
    const dniPac = this.route.snapshot.paramMap.get('pacienteDni') // pacienteDni se lo definio en app.routes
    const idSesion = Number(this.route.snapshot.paramMap.get('idSesion')) // este idSesion se lo definio en app.routes
    if (dniPac) {
      this.dniPaciente = dniPac;
    } else {
      console.warn('No se recibió el parámetro pacienteDni en la ruta.');
    }
    this.cargarInfoSesion(idSesion);
  }

  cargarInfoSesion(idSesion: number) {
    this.sesionesServices.getSesionSintomas(idSesion).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.sesion = data[0]; // datos generales
          for (let sesion of data) {
            if (sesion.descripcionSintoma) {
              this.sintomas.push(sesion.descripcionSintoma);
            }
          }
        } else {
          this.sesion = null;
          this.sintomas = [];
        }
      },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }
}
