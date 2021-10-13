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
  Geocode(lat:any,lng:any):Observable<any>{
    return this.http.get('https://us1.locationiq.com/v1/reverse.php?key=pk.c43cff0bb3812b9938b1d48adc16660a&lat='+lat+'&lon='+lng+'&format=json')
  }
  ReverseGeocode(ubi:any):Observable<any>{
    return this.http.get('https://us1.locationiq.com/v1/search.php?key=pk.c43cff0bb3812b9938b1d48adc16660a&q='+ubi+'&format=json')
  }
}
