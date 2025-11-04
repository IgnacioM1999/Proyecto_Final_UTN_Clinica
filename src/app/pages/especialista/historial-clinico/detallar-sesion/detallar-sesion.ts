import { Component, OnInit } from '@angular/core';
import { Sesion, SesionesServices } from '../../../../services/sesiones';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detallar-sesion',
  imports: [RouterLink, CommonModule],
  templateUrl: './detallar-sesion.html',
  styleUrl: './detallar-sesion.css'
})
export class DetallarSesion implements OnInit {
    dniPaciente: string = ''
    sesion: Sesion | null = null;
    sintomas: string[] = [];

    constructor(private route: ActivatedRoute, private sesionesServices: SesionesServices) { }
  
    ngOnInit(): void {
      // Capturamos el parámetro de la URL
      const dniPac = this.route.snapshot.paramMap.get('dniPaciente') // pacienteDni se lo definio en app.routes
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
            this.sesion = data[0]; // datos generales de la sesion, ya que es un objeto de sesiones donde los datos son repetidos asi que solo se toma los datos el primer objeto
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
