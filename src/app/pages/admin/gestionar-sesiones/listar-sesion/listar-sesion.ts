import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sesion, SesionesServices } from '../../../../services/sesiones';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-listar-sesion',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-sesion.html',
  styleUrl: './listar-sesion.css'
})
export class ListarSesion implements OnInit {

  constructor(private sesionesServices: SesionesServices) { }

  /*sesiones = [
    {idSesion: 1, nomApePaciente: 'Matias Rubia', nomApeEspecialista:"Enrique Ratti" },
    {idSesion: 2, nomApePaciente: "Danilo Nuñez", nomApeEspecialista:"Manuel Ferrari" },
    {idSesion: 3, nomApePaciente: "Alejo Fernandez", nomApeEspecialista:"Osvaldo Montoya" }
  ]*/

  dniPacienteFiltrado: string = '';
  nombrePacienteFiltro: string = '';

  sesiones: Sesion[] = [];
  sesionesFiltradas: Sesion[] = [];

  mesFiltro: string = '';
  anioFiltro: number | null = null;

  meses = [
    { nombre: "Enero", valor: "01" },
    { nombre: "Febrero", valor: "02" },
    { nombre: "Marzo", valor: "03" },
    { nombre: "Abril", valor: "04" },
    { nombre: "Mayo", valor: "05" },
    { nombre: "Junio", valor: "06" },
    { nombre: "Julio", valor: "07" },
    { nombre: "Agosto", valor: "08" },
    { nombre: "Septiembre", valor: "09" },
    { nombre: "Octubre", valor: "10" },
    { nombre: "Noviembre", valor: "11" },
    { nombre: "Diciembre", valor: "12" },
  ];

  ngOnInit(): void {
    this.cargarSesiones();
  }

  //Cargar sesiones desde el backend
  cargarSesiones(): void {
    this.sesionesServices.getSesionesConNombres().subscribe({
      next: (data) => {
        this.sesiones = data;
        this.sesionesFiltradas = [...this.sesiones];
      },
      error: (err) => console.error('Error al cargar sesiones:', err)
    });
  }

  filtrarSesiones(): void {
    // Si no se ingresó ningún filtro, mostrar todas las sesiones
    if (!this.nombrePacienteFiltro && !this.dniPacienteFiltrado && !this.mesFiltro && !this.anioFiltro) {
      this.sesionesFiltradas = [...this.sesiones];
      return;
    }
    // Si se ingresó algún filtro, aplicar el filtrado
    this.sesionesFiltradas = this.sesiones.filter(sesion => {
      const coincideNombre = this.nombrePacienteFiltro
        ? sesion.nombreYApellidoPaciente?.toLowerCase().includes(this.nombrePacienteFiltro.toLowerCase())
        : true;

      const coincideDni = this.dniPacienteFiltrado
        ? sesion.dniPaciente?.includes(this.dniPacienteFiltrado)
        : true;

      const fecha = new Date(sesion.fecha);

      const coincideMes =
        this.mesFiltro ?
          (('0' + (fecha.getMonth() + 1)).slice(-2) === this.mesFiltro) :
          true;

      const coincideAnio =
        this.anioFiltro ?
          (fecha.getFullYear() === this.anioFiltro) :
          true;

      return coincideNombre && coincideDni && coincideMes && coincideAnio;
    });
  }

  limpiarFiltroSesion(): void {
    this.dniPacienteFiltrado = '';
    this.nombrePacienteFiltro = '';
    this.mesFiltro = '';
    this.anioFiltro = null;
    this.sesionesFiltradas = [...this.sesiones];
  }

    imprimirPDF(): void {
      const doc = new jsPDF('p', 'mm', 'a4');
  
      doc.setFontSize(14);
      doc.text("Administrador - Listado de Sesiones", 14, 15);
  
      const filas = this.sesionesFiltradas.map(s => [
        s.idSesion ?? '',
        s.dniPaciente ?? '',
        s.nombreYApellidoPaciente ?? '',
        s.nombreYApellidoEspecialista ?? '',
        s.fecha ? new Date(s.fecha).toLocaleDateString() : '',
        s.horaInicio ?? '',
        s.descripcionSindrome ?? '',
        s.descripcionTratamiento ?? ''
      ]);
  
      autoTable(doc, {
        startY: 20,
        head: [[
          'ID', 'DNI', 'Paciente', 'Especialista',
          'Fecha', 'Hora', 'Síndrome', 'Tratamiento'
        ]],
        body: filas,
        theme: 'grid',
        styles: { fontSize: 10 }
      });
  
      doc.save('administrador_sesiones.pdf');
    }


}
