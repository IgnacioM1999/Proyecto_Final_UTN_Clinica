import { Component, OnInit } from '@angular/core';
import { Sesion, SesionesServices } from '../../../services/sesiones';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';
import jsPDF from 'jspdf'; //Se hizo npm install jsPDF anteriormente
import autoTable from 'jspdf-autotable'; //Se hizo npm install jspdf jspdf-autotable anteriormente
import { PasantesServices, Pasante } from '../../../services/pasantes';

@Component({
  selector: 'app-ver-sesiones',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ver-sesiones.html',
  styleUrl: './ver-sesiones.css'
})
export class VerSesiones implements OnInit {
  sesiones: Sesion[] = []
  fechaFiltro: string = ''; //fecha seleccionada en el input
  sesionesFiltradas: Sesion[] = [];
  sesionSeleccionada: Sesion | null = null; //del boton del Ver Detalle para abrir el modal

  totalDuracion: string = '';

  pasante!: Pasante;

  constructor(private sesionesServices: SesionesServices, private pasantesServices: PasantesServices) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); //Transforma la cadena JSON en el objeto Usuario
    const dniPasante = usuario.dniUsuario;
    this.pasantesServices.getPasante(dniPasante).subscribe({
      next: (dataPasante: Pasante) => {
        this.pasante = dataPasante;
      },
      error: (err) => console.error('Error al cargar el pasante:', err)
    });
    this.sesionesServices.getSesionesPasante(dniPasante).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.sesiones = data;
        this.sesionesFiltradas = [...this.sesiones]; // inicializa con todos los turnos
        this.calcularTotal();
      },
      error: (err) => console.error('Error al cargar las sesiones del pasante:', err)
    })
  }

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }

    // Comparamos fechas en formato ISO (yyyy-MM-dd)
    const filtroISO = new Date(this.fechaFiltro).toISOString().split('T')[0];
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const fechaTurno = new Date(sesion.fecha).toISOString().split('T')[0];
      return fechaTurno === filtroISO;
    });
    this.calcularTotal();
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.sesionesFiltradas = [...this.sesiones];
    this.calcularTotal();
  }

  abrirModal(sesion: Sesion) {
    this.sesionSeleccionada = sesion;

    // Mostrar el modal manualmente
    const modalElement = document.getElementById('detalleModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  calcularTotal() {
    let totalMin = 0;

    this.sesionesFiltradas.forEach(s => {
      if (s.duracionSesion) {
        const [h, m] = s.duracionSesion.split(':').map(Number);
        totalMin += h * 60 + m;
      }
    });

    const horas = Math.floor(totalMin / 60);
    const minutos = totalMin % 60;

    this.totalDuracion = `${horas}h ${minutos}m`;
  }

  imprimirPDF() {
    const doc = new jsPDF();

    // ===== ENCABEZADO PRINCIPAL =====
    doc.setFontSize(18);
    doc.text("Reporte de Sesiones", 14, 15);

    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 22);


    // ===== DATOS DEL PASANTE =====
    if (this.pasante) {
      doc.setFontSize(13);
      doc.setTextColor(0);
      doc.text("Datos del Pasante:", 14, 32);

      doc.setFontSize(11);
      doc.setTextColor(60);

      const datosPasante = [
        `Nombre y Apellido: ${this.pasante.nombreYApellido || "—"}`,
        `Institución: ${this.pasante.institucion || "—"}`,
        `Inicio: ${this.pasante.mesInicio} ${this.pasante.anioInicio}`,
        `Docente: ${this.pasante.docente || "—"}`,
        `Categoría: ${this.pasante.categoria || "—"}`
      ];

      let y = 38;
      datosPasante.forEach(texto => {
        doc.text(texto, 14, y);
        y += 6;
      });
    }

    const startTableY = 70;

    // ===== TABLA DE SESIONES =====
    autoTable(doc, {
      startY: startTableY,
      head: [[
        'ID',
        'Paciente',
        'Especialista',
        'Fecha',
        'Hora',
        'Duración'
      ]],
      body: this.sesionesFiltradas.map(s => [
        s.idSesion?.toString() || '',
        s.nombreYApellidoPaciente || '',
        s.nombreYApellidoEspecialista || '',
        new Date(s.fecha).toLocaleDateString() || '',
        s.horaInicio || '',
        s.duracionSesion || ''
      ]),
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        halign: 'center'
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },  // ID
        1: { cellWidth: 45 },                   // Paciente
        2: { cellWidth: 45 },                   // Especialista
        3: { halign: 'center', cellWidth: 28 }, // Fecha
        4: { halign: 'center', cellWidth: 25 }, // Hora
        5: { halign: 'center', cellWidth: 25 }  // Duración
      }
    });

    // ===== TOTAL DURACIÓN =====
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total de Duración: ${this.totalDuracion}`, 14, finalY);

    doc.save("reporte_sesiones.pdf");
  }
}
