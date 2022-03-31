import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  servidor:string;

  constructor(private http: HttpClient) {
    this.servidor="http://localhost:8080";
    //this.servidor="https://api-iannello.herokuapp.com";
  }

  iniciarsesion(datos:any):Observable<any>{
    const headers=new HttpHeaders().set('Acces-Control-Allow-Origin','*');
    return this.http.post(this.servidor+'/usuario/login/',datos,{'headers':headers})
  }
}
