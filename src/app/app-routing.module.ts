import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { EmpresaGuard } from './helpers/empresa.guard';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'Empresa', component:EmpresaComponent,canActivate:[EmpresaGuard]},
  { path: 'Registro',component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
