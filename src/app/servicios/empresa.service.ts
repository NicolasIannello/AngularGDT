import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  servidor:string;
  header:HttpHeaders;

  constructor(private http: HttpClient) {
    this.servidor="http://localhost:8080";
    //this.servidor="https://api-iannello.herokuapp.com";
    this.header=new HttpHeaders().set('Acces-Control-Allow-Origin','*');
  }

  cargarServicios():Observable<any>{
    return this.http.get(this.servidor+'/servicios/',{'headers':this.header})
  }
  traerNombre(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/turno/traernom/',dato,{'headers':this.header})
  }
  cargarTurno(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/turno/cargar/',dato,{'headers':this.header})
  }
  crearTurno(dato:any):Observable<any>{
    return this.http.post(this.servidor+"/turno/crear/",dato,{'headers':this.header})
  }
  Eliminar(dato:any):Observable<any>{
    return this.http.post(this.servidor+"/turno/eliminar/",dato,{'headers':this.header})
  }
  cargarClientes(dato:any):Observable<any>{
    return this.http.post(this.servidor+"/turno/clienteCargar/",dato,{'headers':this.header})
  }
  crearCliente(dato:any):Observable<any>{
    return this.http.post(this.servidor+"/turno/turnoCliente/",dato,{'headers':this.header})
  }
}