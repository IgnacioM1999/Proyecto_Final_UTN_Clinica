import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { GestionarTurnos } from './pages/admin/gestionar-turnos/gestionar-turnos';
import { CrearTurno } from './pages/admin/gestionar-turnos/crear-turno/crear-turno';
import { ModificarTurno } from './pages/admin/gestionar-turnos/modificar-turno/modificar-turno';
import { EliminarTurno } from './pages/admin/gestionar-turnos/eliminar-turno/eliminar-turno';
import { ListarTurno } from './pages/admin/gestionar-turnos/listar-turno/listar-turno';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'admin', component: Admin },
    {path: 'admin/gestionar-turnos', component: GestionarTurnos },
    {path: 'admin/gestionar-turnos/crear-turno', component: CrearTurno},
    {path: 'admin/gestionar-turnos/modificar-turno', component: ModificarTurno},
    {path: 'admin/gestionar-turnos/eliminar-turno', component: EliminarTurno},
    {path: 'admin/gestionar-turnos/listar-turno', component: ListarTurno}
];
