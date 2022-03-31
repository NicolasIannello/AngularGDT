import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  servidor:string;
  header:HttpHeaders;

  constructor(private http: HttpClient) {
    //this.servidor="http://localhost:8080";
    this.servidor="https://api-iannello.herokuapp.com";
    this.header=new HttpHeaders().set('Acces-Control-Allow-Origin','*');
  }

  traernom(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/traernom/',dato,{'headers':this.header})
  }
  servicios():Observable<any>{
    return this.http.get(this.servidor+'/servicios/',{'headers':this.header})
  }
  localidades():Observable<any>{
    return this.http.get(this.servidor+'/localidades/',{'headers':this.header})
  }
  buscarServicios(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/buscarservicios/',dato,{'headers':this.header})
  }
  ReGeo(ubi:any):Observable<any>{
    return this.http.get('https://us1.locationiq.com/v1/search.php?key=pk.c43cff0bb3812b9938b1d48adc16660a&q='+ubi+'&format=json')
  }
  diaServicios(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/diaservicio/',dato,{'headers':this.header})
  }
  horarios(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/horarios/',dato,{'headers':this.header})
  }
  crearTurno(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/crear/',dato,{'headers':this.header})
  }
  cargarTurnos(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/cargar/',dato,{'headers':this.header})
  }
  Eliminar(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/cliente/eliminar/',dato,{'headers':this.header})
  }
}
