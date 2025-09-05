import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Pasante {
  nombre: string;
  apellido: string;
  email: string;
  codigoUsuario: string;
  legajo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasanteService {
  private pasantesSubject = new BehaviorSubject<Pasante[]>([]);
  pasantes$ = this.pasantesSubject.asObservable();

  getPasantes(): Pasante[] {
    return this.pasantesSubject.value;
  }

  addPasante(pasante: Pasante) {
    const updated = [...this.pasantesSubject.value, pasante];
    this.pasantesSubject.next(updated);
  }

  deletePasante(legajo: string) {
    const updated = this.pasantesSubject.value.filter(p => p.legajo !== legajo);
    this.pasantesSubject.next(updated);
  }
}
