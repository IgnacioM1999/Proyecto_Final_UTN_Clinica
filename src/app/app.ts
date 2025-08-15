import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true,
})
export class App {
  protected readonly title = signal('Proyecto_Final_Clinica');
}
