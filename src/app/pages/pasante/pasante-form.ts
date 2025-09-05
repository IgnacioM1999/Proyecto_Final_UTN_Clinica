import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasanteService } from './pasante.service';

@Component({
  selector: 'app-pasante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pasante-form.html',
})
export class PasanteForm implements OnInit, OnDestroy {
  pasanteForm: FormGroup;
  private formChangesSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private pasanteService: PasanteService) {
    this.pasanteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      codigoUsuario: [{ value: '', disabled: true }], // Campo para mostrar el código
      legajo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const nombreControl = this.pasanteForm.get('nombre');
    const apellidoControl = this.pasanteForm.get('apellido');

    if (nombreControl && apellidoControl) {
      this.formChangesSubscription.add(
        nombreControl.valueChanges.subscribe(() => this.generarCodigoUsuario())
      );
      this.formChangesSubscription.add(
        apellidoControl.valueChanges.subscribe(() => this.generarCodigoUsuario())
      );
    }
  }

  ngOnDestroy(): void {
    this.formChangesSubscription.unsubscribe();
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  getError(controlName: string, errorName: string): boolean {
    return this.pasanteForm.get(controlName)?.hasError(errorName) &&
           this.pasanteForm.get(controlName)?.touched || false;
  }

  private generarCodigoUsuario(): void {
    const nombre = this.pasanteForm.get('nombre')?.value || '';
    const apellido = this.pasanteForm.get('apellido')?.value || '';

    if (nombre && apellido) {
      const codigoUsuario =
          nombre.substring(0, 3).toLowerCase() +
          apellido.substring(0, 3).toLowerCase() +
          Math.floor(100 + Math.random() * 900);
      
      this.pasanteForm.patchValue({ codigoUsuario: codigoUsuario });
    }
  }

  onSubmit() {
    if (this.pasanteForm.invalid) {
      this.pasanteForm.markAllAsTouched();
      return;
    }

    // Usamos getRawValue() para incluir campos deshabilitados como 'codigoUsuario'
    const datosCompletosDelPasante = this.pasanteForm.getRawValue(); 
    delete datosCompletosDelPasante.confirmPassword;

    // Enviar 'datosCompletosDelPasante' a tu servicio
    this.pasanteService.addPasante(datosCompletosDelPasante);
    alert(`✅ Pasante creado con éxito.\n\nSu código de usuario es: ${datosCompletosDelPasante.codigoUsuario}`);
    this.pasanteForm.reset();
  }

}
