import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { PasanteForm } from './pages/pasante/pasante-form';
import { PasanteList } from './pages/pasante/pasante-list';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'pasante-registro', component: PasanteForm },
    { path: 'pasantes', component: PasanteList },
    { path: '**', redirectTo: '/login' } // Redirect any unknown paths to login
];
