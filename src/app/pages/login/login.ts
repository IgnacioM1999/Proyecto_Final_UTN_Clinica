import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario?: string;
  password?: string;
  remember: boolean = false;

  constructor(private router: Router){}

  onSubmit() {
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.password);

    if (this.usuario === 'admin' && this.password === '1234') {
      alert('✅ Login exitoso!');
    } else {
      alert('❌ Usuario o contraseña incorrectos');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // <- ruta hacia el componente de registro
  }

}
