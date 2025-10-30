import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tratamiento } from '../../../../../services/tratamientos';
import { Insumo, InsumosServices } from '../../../../../services/insumos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Sesion, SesionesServices } from '../../../../../services/sesiones';
import { TurnosServices } from '../../../../../services/turnos';
import { PasantesServices } from '../../../../../services/pasantes';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-registrar-puntos',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './registrar-puntos.html',
  styleUrl: './registrar-puntos.css'
})
export class RegistrarPuntos implements OnInit {

  @ViewChild('cuerpoImg') cuerpoImg!: ElementRef<HTMLImageElement>;
  @ViewChild('zoomContainer') zoomContainer!: ElementRef<HTMLDivElement>;
  zoom = 1;
  translateX = 0;
  translateY = 0;
  isDragging = false;
  lastX = 0;
  lastY = 0;

  puntos: string[] = [];
  tratamiento?: Tratamiento | null = null;
  insumos: Insumo[] = [];
  observaciones: string = '';
  duracionSesion: string = '';

  constructor(private pasantesServices: PasantesServices, private turnosServices: TurnosServices, private insumosServices: InsumosServices, private sesionesServices: SesionesServices, private router: Router) { }

  ngOnInit(): void {
    const data = localStorage.getItem('tratamientoSeleccionado');
    if (data) {
      try {
        this.tratamiento = JSON.parse(data);
        this.puntos = this.tratamiento?.puntos?.split(',') ?? [];
        console.log(this.puntos);
      } catch (err) {
        console.error('Error al parsear tratamientoSeleccionado', err);
      }
    }
    this.cargarInsumosDescartables();
  }

  cargarInsumosDescartables() {
    this.insumosServices.obtenerDescartables().subscribe(data => {
      this.insumos = data.map(i => ({ ...i, cantidadUsada: 0 }));
    });
  }

  actualizarCantidad(insumo: Insumo) {
    const cantidadUsada = insumo.cantidadUsada ?? 0; // si es undefined, usa 0
    if (cantidadUsada > insumo.cantidad) {
      insumo.cantidadUsada = insumo.cantidad;
      alert(`No puedes usar más de ${insumo.cantidad} unidades de ${insumo.nombre}.`);
    }
  }

  guardarDatos() {
    const insumosUsados = this.insumos.filter(i => (i.cantidadUsada ?? 0) > 0).map(i => ({
      idInsumo: i.idInsumos,
      cantidadUsada: i.cantidadUsada ?? 0
    }));
    console.log('Observaciones:', this.observaciones);
    // Acá después podrías enviar al backend los datos de la sesión
  }

  volver() {
    localStorage.removeItem('tratamientoSeleccionado');
    this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion/registrar-cuestio/mostrar-sindromes/mostrar-tratamientos']);
  }

  registrar() {
    if (!this.duracionSesion || !this.observaciones.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete la duración de la sesión y las observaciones antes de continuar.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }
    // Recuperar datos del localStorage
    const seleccionTurno = JSON.parse(localStorage.getItem('seleccionTurnoParaSesion')!);
    const cuestionario = JSON.parse(localStorage.getItem('cuestionarioSesion')!);
    const sindrome = JSON.parse(localStorage.getItem('sindromeSeleccionado')!);
    const tratamiento = JSON.parse(localStorage.getItem('tratamientoSeleccionado')!);

    const fechaFormateada = seleccionTurno.fechaTurno.split('T')[0];

    // Crear el objeto Sesion
    const nuevaSesion: Sesion = {
      idSesion: 0, // autoincrement, el backend lo genera
      fecha: fechaFormateada,
      horaInicio: seleccionTurno.horarioTurno,
      descripcionSesion: cuestionario.descripcion,
      idSindrome: sindrome.idSindrome,
      dniPaciente: seleccionTurno.dniPaciente,
      dniEspecialista: seleccionTurno.dniEspecialista,
      idTratamiento: tratamiento.idTratamiento,
      observacionesSesion: this.observaciones,
      duracionSesion: this.duracionSesion
    };
    //Registrar la sesion
    this.sesionesServices.createSesion(nuevaSesion).subscribe({
      next: (response) => {
        const idSesionCreada = response.idSesion;
        console.log('Sesión creada con ID:', idSesionCreada);

        //Registrar síntomas asociados
        const sintomas = cuestionario.sintomas.map((s: any) => ({
          idSintoma: s.idSintoma,
          fechaInicioSintoma: s.fechaInicioSintoma,
          nivelMolestia: s.nivelMolestia
        }));

        this.sesionesServices.createSintomasSesion(idSesionCreada, sintomas).subscribe({
          next: () => {
            //Registrar insumos asociados
            const insumos = this.insumos.filter(i => (i.cantidadUsada ?? 0) > 0)
              .map(i => ({
                idInsumo: i.idInsumos,
                cantidadUsada: i.cantidadUsada ?? 0
              }));
            this.sesionesServices.createInsumosSesion(idSesionCreada, insumos).subscribe({
              next: () => {
                //Actualizar la cantidad de insumos en stock restando la cantidad de insumos usados
                this.insumosServices.restarInsumosUsados(insumos).subscribe({
                  next: () => {
                    console.log('Stock de insumos actualizado correctamente.');
                    // Actualizar estado del turno
                    this.turnosServices.actualizarEstadoTurno(seleccionTurno.idTurno, 'Ocupado').subscribe({
                      next: () => {

                        //Actualizar horas de los pasantes
                        const duracionHoras = parseFloat(this.duracionSesion); // si es "2", "1.5", etc.
                        const dniPasantes = seleccionTurno.dniPasantes || [];

                        if (dniPasantes.length > 0) {
                          const actualizaciones = dniPasantes.map((dni: string) =>
                            this.pasantesServices.actualizarHorasPasante(dni, duracionHoras)
                          );

                          // Ejecutamos todas las actualizaciones en paralelo
                          forkJoin(actualizaciones).subscribe({
                            next: () => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Registro exitoso',
                                text: 'La sesión ha sido registrada correctamente.',
                                confirmButtonColor: '#198754'
                              }).then(() => {
                                //Remueve las keys del localStorage tras el exito del registro
                                ['seleccionTurnoParaSesion', 'cuestionarioSesion', 'sindromeSeleccionado', 'tratamientoSeleccionado']
                                  .forEach(key => localStorage.removeItem(key));
                                this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion']);
                              });
                            },
                            error: (error) => {
                              console.error('Error al actualizar horas de pasantes:', error);
                              Swal.fire({
                                icon: 'warning',
                                title: 'Atención',
                                text: 'La sesión se registró correctamente, pero hubo un problema al actualizar las horas de los pasantes.',
                                confirmButtonColor: '#ffc107'
                              });
                            }
                          });
                        } else {
                          // Si no hay pasantes, solo mostramos el mensaje final de que tuvo existo el registro
                          Swal.fire({
                            icon: 'success',
                            title: 'Registro exitoso',
                            text: 'Sesión registrada correctamente.',
                            confirmButtonColor: '#198754'
                          }).then(() => {
                            //Remueve las keys del localStorage tras el exito del registro
                            ['seleccionTurnoParaSesion', 'cuestionarioSesion', 'sindromeSeleccionado', 'tratamientoSeleccionado']
                              .forEach(key => localStorage.removeItem(key));
                            this.router.navigate(['/especialista/gestion-sesiones/registrar-sesion']);
                          });
                        }
                      },
                      error: (error) => {
                        console.error('Error al actualizar el estado del turno:', error);
                        Swal.fire({
                          icon: 'warning',
                          title: 'Atención',
                          text: 'La sesión se registró correctamente, pero no se pudo actualizar el estado del turno.',
                          confirmButtonColor: '#ffc107'
                        });
                      }
                    });
                  },
                  error: (error) => {
                    console.error('Error al restar stock de insumos:', error);
                    Swal.fire({
                      icon: 'warning',
                      title: 'Atención',
                      text: 'La sesión se registró correctamente, pero hubo un problema al actualizar el stock de insumos.',
                      confirmButtonColor: '#ffc107'
                    });
                  }
                });
              },
              error: (error) => {
                console.error('Error al registrar insumos:', error);
                Swal.fire({
                  icon: 'warning',
                  title: 'Atención',
                  text: 'La sesión y los síntomas se registraron, pero hubo un problema al registrar los insumos.',
                  confirmButtonColor: '#ffc107'
                });
              }
            });
          },
          error: (error) => {
            console.error('Error al registrar síntomas:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La sesión se registró, pero hubo un problema al registrar los síntomas.',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }, error: (error) => {
        console.error('Error al registrar sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar la sesión.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  //Funciones para la imagen
  onWheel(event: WheelEvent) {
    event.preventDefault();

    const rect = this.zoomContainer.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left; // posición del mouse dentro del contenedor
    const offsetY = event.clientY - rect.top;
    const prevZoom = this.zoom;
    const zoomSpeed = 0.1;

    // Aumentar o disminuir el zoom
    if (event.deltaY < 0) {
      this.zoom = Math.min(this.zoom + zoomSpeed, 5);
    } else {
      this.zoom = Math.max(this.zoom - zoomSpeed, 1);
    }

    // Calcular el punto de enfoque del zoom
    const zoomFactor = this.zoom / prevZoom;
    this.translateX = offsetX - zoomFactor * (offsetX - this.translateX);
    this.translateY = offsetY - zoomFactor * (offsetY - this.translateY);
  }

  startDragging(event: MouseEvent) {
    if (event.button !== 0) return;
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    event.preventDefault();
  }

  stopDragging() {
    this.isDragging = false;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;
    this.translateX += dx;
    this.translateY += dy;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  //Use este metodo anteriormente, pero creo que ahora no hace falta
  zoomImagen(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoom += 0.1;
    } else {
      this.zoom -= 0.1;
    }
    this.zoom = Math.min(Math.max(this.zoom, 0.5), 3); // Limita entre 0.5 y 3
    this.cuerpoImg.nativeElement.style.transform = `scale(${this.zoom})`;
  }

}
