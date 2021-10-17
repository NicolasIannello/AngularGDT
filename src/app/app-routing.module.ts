import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { EmpresaGuard } from './helpers/empresa.guard';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ClienteGuard } from './helpers/cliente.guard';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'Empresa', component:EmpresaComponent,canActivate:[EmpresaGuard]},
  { path: 'Registro',component:RegistroComponent},
  { path: 'Cliente',component:ClienteComponent,canActivate:[ClienteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }