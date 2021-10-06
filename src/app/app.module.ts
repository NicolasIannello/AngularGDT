import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FondoComponent } from './componentes/fondo/fondo.component';
import { LoginComponent } from './componentes/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FondoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
