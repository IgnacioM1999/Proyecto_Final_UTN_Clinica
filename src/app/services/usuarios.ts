import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

// Interfaz que representa un especialista
export interface Usuario {
  dniUsuario: string;
  nombreYApellido: string;
  telefono: string;
  mail: string;
  nombreUsuario: string;
  contrasenia: string;
  tipoUsuario?: string;
  idLocalidad?: number;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosServices {

  private apiUrl = 'http://localhost:3000/usuarios'; //URL que se usa en el backend

  constructor(private http: HttpClient) { }

  //Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
  }

  // Obtener un usuario por dni
  getUsuario(dni: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${dni}`);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Modificar usuarios
  updateUsuarios(dni: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${dni}`, usuario);
  }

  // Eliminar Logicamente Usuarios
  deleteUsuarios(dni: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dni}`);
  }

  // Obtener todos los especialistas (usuarios donde el tipoUsuario = "especialista")
  getEspecialistas(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/especialistas`);
  }

  // Servicio para recuperar contraseña X AHORA NO SE USA ESTE METODO
  recuperarPassword(nombreUsuario: string, email: string) {

  }

  //Actualizar la contraseña del usuario
  //Este metodo se usa en el componente perfil
  actualizarContrasenia(dniUsuario: string, nuevaContrasenia: string): Observable<any> {
    const body = { nuevaContrasenia };
    return this.http.put(`${this.apiUrl}/${dniUsuario}/contrasenia`, body);
  }

  //Obtener la contrasela del usuario por email y nombre usuario.
  //Este metodo es usando en el componente Password
  getUsuarioPorMailYNombreUsuario(mail: string, nombreUsuario: string): Observable<Usuario | null> {
  console.log('Se llego a llamar al servicio');
  return this.http.get<Usuario | null>(`${this.apiUrl}/${mail}/${nombreUsuario}`);
}


}