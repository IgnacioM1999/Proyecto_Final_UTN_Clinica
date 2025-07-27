import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  onSubmit() {
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.password);

    if (this.usuario === 'admin' && this.password === '1234') {
      alert('✅ Login exitoso!');
    } else {
      alert('❌ Usuario o contraseña incorrectos');
    }
  }

}
