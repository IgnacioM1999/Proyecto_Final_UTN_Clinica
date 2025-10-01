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
import { GestionarPacientes } from './pages/admin/gestionar-pacientes/gestionar-pacientes';
import { CrearPaciente } from './pages/admin/gestionar-pacientes/crear-paciente/crear-paciente';
import { ModificarPaciente } from './pages/admin/gestionar-pacientes/modificar-paciente/modificar-paciente';
import { EliminarPaciente } from './pages/admin/gestionar-pacientes/eliminar-paciente/eliminar-paciente';
import { ListarPaciente } from './pages/admin/gestionar-pacientes/listar-paciente/listar-paciente';
import { GestionarEspecialistas } from './pages/admin/gestionar-especialistas/gestionar-especialistas';
import { CrearEspecialista } from './pages/admin/gestionar-especialistas/crear-especialista/crear-especialista';
import { ModificarEspecialista } from './pages/admin/gestionar-especialistas/modificar-especialista/modificar-especialista';
import { EliminarEspecialista } from './pages/admin/gestionar-especialistas/eliminar-especialista/eliminar-especialista';
import { ListarEspecialista } from './pages/admin/gestionar-especialistas/listar-especialista/listar-especialista';
import { GestionarSesiones } from './pages/admin/gestionar-sesiones/gestionar-sesiones';
import { ListarSesion } from './pages/admin/gestionar-sesiones/listar-sesion/listar-sesion';
import { HistorialClinico } from './pages/admin/historial-clinico/historial-clinico';
import { ListadoSesionesPaciente } from './pages/admin/historial-clinico/listado-sesiones-paciente/listado-sesiones-paciente';
import { DetallesSesion } from './pages/admin/historial-clinico/detalles-sesion/detalles-sesion';
import { Register } from './pages/register/register';
import { Perfil } from './pages/perfil/perfil';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'admin', component: Admin },
    {path: 'register', component: Register },
    {path: 'perfil', component: Perfil },
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
    {path: 'admin/gestionar-pasantes/listar-pasante', component: ListarPasante},
    {path: 'admin/gestionar-pacientes', component: GestionarPacientes},
    {path: 'admin/gestionar-pacientes/crear-paciente', component:CrearPaciente},
    {path: 'admin/gestionar-pacientes/modificar-paciente', component:ModificarPaciente},
    {path: 'admin/gestionar-pacientes/eliminar-paciente', component:EliminarPaciente},
    {path: 'admin/gestionar-pacientes/listar-paciente', component:ListarPaciente},
    {path: 'admin/gestionar-especialistas', component:GestionarEspecialistas},
    {path: 'admin/gestionar-especialistas/crear-especialista', component:CrearEspecialista},
    {path: 'admin/gestionar-especialistas/modificar-especialista', component:ModificarEspecialista},
    {path: 'admin/gestionar-especialistas/eliminar-especialista', component:EliminarEspecialista},
    {path: 'admin/gestionar-especialistas/listar-especialista', component:ListarEspecialista},
    {path: 'admin/gestionar-sesiones', component:GestionarSesiones},
    {path: 'admin/gestionar-sesiones/listar-sesion', component:ListarSesion},
    {path: 'admin/historial-clinico', component:HistorialClinico},
    {path: 'admin/historial-clinico/:pacienteDni', component:ListadoSesionesPaciente},
    {path: 'admin/historial-clinico/:pacienteDni/detalles-sesion/:idSesion', component:DetallesSesion}
];
