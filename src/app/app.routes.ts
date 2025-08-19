import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { GestionarTurnos } from './pages/admin/gestionar-turnos/gestionar-turnos';
import { CrearTurno } from './pages/admin/gestionar-turnos/crear-turno/crear-turno';
import { ModificarTurno } from './pages/admin/gestionar-turnos/modificar-turno/modificar-turno';
import { EliminarTurno } from './pages/admin/gestionar-turnos/eliminar-turno/eliminar-turno';
import { ListarTurno } from './pages/admin/gestionar-turnos/listar-turno/listar-turno';
import { GestionarInsumos } from './pages/admin/gestionar-insumos/gestionar-insumos';
import { CrearInsumo } from './pages/admin/gestionar-insumos/crear-insumo/crear-insumo';
import { ModificarInsumo } from './pages/admin/gestionar-insumos/modificar-insumo/modificar-insumo';
import { EliminarInsumo } from './pages/admin/gestionar-insumos/eliminar-insumo/eliminar-insumo';
import { ListarInsumo } from './pages/admin/gestionar-insumos/listar-insumo/listar-insumo';
import { GestionarPasantes } from './pages/admin/gestionar-pasantes/gestionar-pasantes';
import { CrearPasante } from './pages/admin/gestionar-pasantes/crear-pasante/crear-pasante';
import { ModificarPasante } from './pages/admin/gestionar-pasantes/modificar-pasante/modificar-pasante';
import { EliminarPasante } from './pages/admin/gestionar-pasantes/eliminar-pasante/eliminar-pasante';
import { ListarPasante } from './pages/admin/gestionar-pasantes/listar-pasante/listar-pasante';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'admin', component: Admin },
    {path: 'admin/gestionar-turnos', component: GestionarTurnos },
    {path: 'admin/gestionar-turnos/crear-turno', component: CrearTurno},
    {path: 'admin/gestionar-turnos/modificar-turno', component: ModificarTurno},
    {path: 'admin/gestionar-turnos/eliminar-turno', component: EliminarTurno},
    {path: 'admin/gestionar-turnos/listar-turno', component: ListarTurno},
    {path: 'admin/gestionar-insumos', component: GestionarInsumos},
    {path: 'admin/gestionar-insumos/crear-insumo', component:CrearInsumo},
    {path: 'admin/gestionar-insumos/modificar-insumo', component: ModificarInsumo},
    {path: 'admin/gestionar-insumos/eliminar-insumo', component: EliminarInsumo},
    {path: 'admin/gestionar-insumos/listar-insumo', component: ListarInsumo},
    {path: 'admin/gestionar-pasantes', component: GestionarPasantes},
    {path: 'admin/gestionar-pasantes/crear-pasante', component: CrearPasante},
    {path: 'admin/gestionar-pasantes/modificar-pasante', component: ModificarPasante},
    {path: 'admin/gestionar-pasantes/eliminar-pasante', component: EliminarPasante},
    {path: 'admin/gestionar-pasantes/listar-pasante', component: ListarPasante}
];
