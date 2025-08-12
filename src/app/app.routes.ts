import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'admin', component: Admin }
];
