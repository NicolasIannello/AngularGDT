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
import { GenerarTurnoComponent } from './componentes/empresa/generar-turno/generar-turno.component';
import { TablaTurnoComponent } from './componentes/empresa/tabla-turno/tabla-turno.component';

@NgModule({
  declarations: [
    AppComponent,
    FondoComponent,
    LoginComponent,
    EmpresaComponent,
    GenerarTurnoComponent,
    TablaTurnoComponent
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
