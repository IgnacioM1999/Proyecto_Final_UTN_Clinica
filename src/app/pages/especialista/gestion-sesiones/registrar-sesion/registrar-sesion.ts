import { Component, HostListener, numberAttribute, OnInit } from '@angular/core';
import { Turno, TurnosServices } from '../../../../services/turnos';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pasante, PasantesServices } from '../../../../services/pasantes';
import { Sesion, SesionesServices } from '../../../../services/sesiones';

@Component({
  selector: 'app-registrar-sesion',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './registrar-sesion.html',
  styleUrl: './registrar-sesion.css'
})
export class RegistrarSesion implements OnInit {
  turnos: Turno[] = [];
  pasantes: Pasante[] = [];
  turnosFiltrados: Turno[] = [];
  pasantesFiltrados: Pasante[] = [];

  dniEspecialista: string = '';
  pacienteDniSeleccionado: string | null = null;
  pasantesDniSeleccionados: string[] = [];
  idTurnoSeleccionado: number = 0;
  fechaTurnoSeleccionado: string = '';
  horarioTurnoSeleccionado: string = '';

  fechaFiltro: string = '';
  nombrePacienteFiltro: string = '';
  nombrePasanteFiltro: string = '';

  // para el modal de historial
  sesionesPaciente: Sesion[] = [];
  pacienteHistorial: string = '';

  constructor(private turnoService: TurnosServices, private router: Router, private pasanteService: PasantesServices, private sesionesService: SesionesServices) { }

  ngOnInit(): void {
    const especialista = localStorage.getItem('usuario');
    if (especialista) {
      const datos = JSON.parse(especialista);
      this.dniEspecialista = datos.dniUsuario;
      console.log('DNI especialista recuperado:', this.dniEspecialista);
      this.cargarTurnos();
      this.cargarPasantes();
    } else {
      console.error('No se encontró información del especialista en localStorage');
    }
  }

  cargarTurnos(): void {
    this.turnoService.getTurnosEsp(this.dniEspecialista).subscribe({
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
      error: (err) => {
        console.error('Error al obtener turnos:', err);
      }
    });
  }
  cargarPasantes(): void {
    this.pasanteService.getPasantes().subscribe({
      next: (dataPasante) => {
        this.pasantes = dataPasante;
        this.pasantesFiltrados = [...this.pasantes];
      },
      error: (err) => {
        console.error('Error al obtener pasantes:', err)
      }
    })
  }

  abrirHistorialPaciente(dniPaciente: string): void {
    this.pacienteHistorial = dniPaciente;
    this.sesionesService.getSesionesPaciente(dniPaciente).subscribe({
      next: (data) => {
        this.sesionesPaciente = data;
        console.log(`Sesiones cargadas para el paciente ${dniPaciente}:`, data);
        // El modal se abre automáticamente por Bootstrap
      },
      error: (err) => console.error('Error al obtener sesiones del pasante:', err)
    });
  }

  filtrarTurnos(): void {
    // Si no se ingresó ningún filtro, mostrar todos los turnos
    if (!this.fechaFiltro && !this.nombrePacienteFiltro) {
      this.turnosFiltrados = [...this.turnos];
      return;
    }

    // Si se ingresó algún filtro, aplicar el filtrado
    this.turnosFiltrados = this.turnos.filter(turno => {
      const coincideFecha = this.fechaFiltro
        ? new Date(turno.fecha).toISOString().split('T')[0] === this.fechaFiltro
        : true;

      const coincideNombre = this.nombrePacienteFiltro
        ? turno.nombrePaciente?.toLowerCase().includes(this.nombrePacienteFiltro.toLowerCase())
        : true;

      return coincideFecha && coincideNombre;
    });
  }

  limpiarFiltroTurnos(): void {
    this.fechaFiltro = '';
    this.nombrePacienteFiltro = '';
    this.turnosFiltrados = [...this.turnos];
  }

  filtrarPasantes(): void {
    // Si no se ingresó ningún filtro, mostrar todos los pasantes
    if (!this.nombrePasanteFiltro || this.nombrePasanteFiltro.trim() === '') {
      this.pasantesFiltrados = [...this.pasantes];
      return;
    }

    // Si hay texto de búsqueda, aplicar el filtro
    this.pasantesFiltrados = this.pasantes.filter(pasante =>
      pasante.nombreYApellido?.toLowerCase().includes(this.nombrePasanteFiltro.toLowerCase())
    );
  }

  limpiarFiltroPasantes(): void {
    this.nombrePasanteFiltro = '';
    this.pasantesFiltrados = [...this.pasantes];
  }

  continuar(): void {
    // Guardar selección en localStorage
    const seleccion = {
      dniPaciente: this.pacienteDniSeleccionado,
      dniPasantes: this.pasantesDniSeleccionados,
      dniEspecialista: this.dniEspecialista,
      idTurno: this.idTurnoSeleccionado,
      fechaTurno: this.fechaTurnoSeleccionado,
      horarioTurno: this.horarioTurnoSeleccionado
    };
    console.log('Guardando selección en localStorage:', seleccion);
    localStorage.setItem('seleccionTurnoParaSesion', JSON.stringify(seleccion));

    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio']);
  }

  volver() {
    localStorage.removeItem('seleccionTurnoParaSesion');
    this.router.navigate(['/especialista/gestion-sesiones']);
  }

  // Toggle para paciente: si clickeás el mismo valor se desmarca
  togglePaciente(dni: string, idTurno: number, event: MouseEvent): void {
    const input = event.target as HTMLInputElement; //Le dice al compilador de TypeScript que el event.target (el elemento que disparó el evento) es un <input> HTML.
    // Si se hace clic en el mismo turno ya seleccionado, lo desmarca
    if (this.pacienteDniSeleccionado === dni && this.idTurnoSeleccionado === idTurno) {
      event.preventDefault(); // evita que se quede visualmente marcado al apretarlo de nuevo
      this.pacienteDniSeleccionado = null;
      this.idTurnoSeleccionado = 0;
      this.fechaTurnoSeleccionado = '';
      this.horarioTurnoSeleccionado = '';
    } else {
      this.pacienteDniSeleccionado = dni;
      this.idTurnoSeleccionado = idTurno;
      const turnoSeleccionado = this.turnos.find(t => t.idTurno === idTurno);
      if (turnoSeleccionado) {
        this.fechaTurnoSeleccionado = turnoSeleccionado.fecha;
        this.horarioTurnoSeleccionado = turnoSeleccionado.horario;
        console.log('Turno seleccionado:', turnoSeleccionado);
      }
    }
  }

  // Toggle para pasante
  togglePasante(dni: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (this.pasantesDniSeleccionados.length < 2) {
        this.pasantesDniSeleccionados.push(dni);
      } else {
        checkbox.checked = false;
        /*alert('Solo se pueden seleccionar hasta dos pasantes.');*/
      }
    } else {
      this.pasantesDniSeleccionados = this.pasantesDniSeleccionados.filter(d => d !== dni);
    }
  }
}
