import { Component } from '@angular/core';
import { Turno, TurnosServices } from '../../../services/turnos';
import { Usuario, UsuariosServices } from '../../../services/usuarios';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendar-turno',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './agendar-turno.html',
  styleUrl: './agendar-turno.css'
})
export class AgendarTurno {

  turnos: Turno[] = []
  usuarios: Usuario[] = []
  fechaFiltro: string = ''; //fecha seleccionada en el input
  turnosFiltrados: Turno[] = [];
  turnoIdSeleccionado: number | null = null

  constructor(private turnosServices: TurnosServices, private usuariosServices: UsuariosServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnosServices.getTurnosDisponibles().subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // eliminamos las horas, minutos y segundos

        // Función auxiliar para comparar fechas sin tener en cuenta la hora
        const esMismoODiaPosterior = (fechaTurno: Date, hoy: Date): boolean => {
          const fTurno = new Date(fechaTurno.getFullYear(), fechaTurno.getMonth(), fechaTurno.getDate());
          const fHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
          return fTurno >= fHoy;
        };

        // Filtramos solo los turnos con fecha >= hoy
        this.turnos = data.filter(t => esMismoODiaPosterior(new Date(t.fecha), hoy));

        this.turnosFiltrados = [...this.turnos];
      },
      error: (err) => console.error('Error al cargar turnos:', err)
    }
    )
  }

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.turnosFiltrados = [...this.turnos];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    const filtroISO = new Date(this.fechaFiltro).toISOString().split('T')[0];
    this.turnosFiltrados = this.turnos.filter(turno => {
      const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
      return fechaTurno === filtroISO;
    });
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.turnosFiltrados = [...this.turnos];
  }

  seleccionarTurno(idTurno: number): void {
    // Si el turno ya está seleccionado, lo desmarca
    this.turnoIdSeleccionado = this.turnoIdSeleccionado === idTurno ? null : idTurno;
  }

  confirmarTurno(): void {
    if (!this.turnoIdSeleccionado) return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); //Transforma la cadena JSON en el objeto Usuario
    const dniPaciente = usuario.dniUsuario;

    if (!dniPaciente) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión no encontrada',
        text: 'No se pudo obtener el DNI del paciente. Inicie sesión nuevamente.'
      });
      return;
    }

    this.turnosServices.agendarTurno(this.turnoIdSeleccionado, 'Ocupado', dniPaciente).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Turno confirmado',
          text: 'El turno fue agendado con éxito.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.cargarTurnos(); // recarga la lista para que desaparezca el turno ocupado
          this.turnoIdSeleccionado = null;
        });
      },
      error: (err) => {
        console.error('Error al agendar turno:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agendar el turno.'
        });
      }
    });
  }

}
