import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" routerLink="/">Clínica UTN</a>
          <a class="nav-link" routerLink="/pasante-registro">Registrar Pasante</a>
          <a class="nav-link" routerLink="/pasantes">Ver Pasantes</a>
        </div>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
}
