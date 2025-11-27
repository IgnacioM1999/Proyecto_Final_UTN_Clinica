import { Component, OnInit } from '@angular/core';
import { Sesion, SesionesServices } from '../../../../services/sesiones';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-sesiones-paciente',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './lista-sesiones-paciente.html',
  styleUrl: './lista-sesiones-paciente.css'
})
export class ListaSesionesPaciente implements OnInit {

  dniPacienteSeleccionado: string = '';
  nombrePaciente: string = '';
  sesionIdSeleccionado: number | null = null;
  sesiones: Sesion[] = [];
  sesionesFiltradas: Sesion[] = [];

  fechaFiltro: string = '';


  constructor(private route: ActivatedRoute, private sesionesServices: SesionesServices) { }

  ngOnInit(): void {
    // Capturamos el parámetro de la URL
    const dni = this.route.snapshot.paramMap.get('dniPaciente') // pacienteDni se lo definio en app.routes
    if (dni) {
      this.dniPacienteSeleccionado = dni;
      this.cargarSesionesPaciente(dni);
    } else {
      console.warn('No se recibió el parámetro pacienteDni en la ruta.');
    }
  }

  cargarSesionesPaciente(dniPaciente: string): void {
    this.sesionesServices.getSesionesPaciente(dniPaciente).subscribe({
      next: (data) => {
        console.log('Sesiones recibidas:', data);

        const sesionesMap = new Map<number, Sesion>();

        data.forEach(row => {

          if (!sesionesMap.has(row.idSesion)) {
            sesionesMap.set(row.idSesion, {
              ...row,
              pasantes: row.nombreYApellidoPasante
                ? [row.nombreYApellidoPasante]
                : [] // puede estar vacío (ningún pasante)
            });
          } else {
            const sesion = sesionesMap.get(row.idSesion)!;

            if (row.nombreYApellidoPasante) {
              sesion.pasantes!.push(row.nombreYApellidoPasante);
            }
          }

        });

        this.sesiones = Array.from(sesionesMap.values());
        this.sesionesFiltradas = [...this.sesiones]

        // 🔹 Si hay sesiones, guardamos el nombre del paciente desde la primera
        if (data.length > 0) {
          this.nombrePaciente = data[0].nombreYApellidoPaciente ?? 'Sin nombre registrado';
        } else {
          this.nombrePaciente = 'Sin sesiones registradas';
        }
      },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }

  filtrarSesiones(): void {
    // Si no se ingresó ningún filtro, mostrar todas las sesiones
    if (!this.fechaFiltro) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }

    // Si se ingresó algún filtro, aplicar el filtrado
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const coincideFecha = this.fechaFiltro
        ? new Date(sesion.fecha).toISOString().split('T')[0] === this.fechaFiltro
        : true;

      return coincideFecha;
    });
  }

  limpiarFiltroSesiones(): void {
    this.fechaFiltro = '';
    this.sesionesFiltradas = [...this.sesiones];
  }


}
