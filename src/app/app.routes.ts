import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
