import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  servidor:string;
  header:HttpHeaders;

  constructor(private http: HttpClient) {
    //this.servidor="http://localhost:8080";
    this.servidor="https://api-iannello.herokuapp.com";
    this.header=new HttpHeaders().set('Acces-Control-Allow-Origin','*');
  }

  crearClie(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/usuario/crear/cliente',dato,{'headers':this.header})
  }
  localidades():Observable<any>{
    return this.http.get(this.servidor+'/localidades/',{'headers':this.header})
  }
  crearEmp(dato:any):Observable<any>{
    return this.http.post(this.servidor+'/usuario/crear/empresa',dato,{'headers':this.header})
  }
}
