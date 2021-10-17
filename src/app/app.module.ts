import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FondoComponent } from './componentes/fondo/fondo.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClient } from '@angular/common/http';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { RempresaComponent } from './componentes/registro/rempresa/rempresa.component';
import { RclienteComponent } from './componentes/registro/rcliente/rcliente.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { TablaComponent } from './componentes/cliente/tabla/tabla.component';
import { CrearComponent } from './componentes/cliente/crear/crear.component';

@NgModule({
  declarations: [
    AppComponent,
    FondoComponent,
    LoginComponent,
    EmpresaComponent,
    RempresaComponent,
    RclienteComponent,
    RegistroComponent,
    ClienteComponent,
    TablaComponent,
    CrearComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
