import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rempresa',
  templateUrl: './rempresa.component.html',
  styleUrls: ['./rempresa.component.css']
})
export class RempresaComponent implements OnInit {
  Localidades:Array<any>=[];
  
  nombre:string="";
  mail:string="";
  contra:string="";
  contra2:string="";
  localidad:string="";

  ctype:string="password";
  ctype2:string="password";

  spinner:string="";
  spinnertext:string="Crear cuenta";

  lat:number=0;
  lon:number=0;
  
  constructor(public api: RegistroService, private router: Router) { }

  ngOnInit(): void {
    new google.maps.Map(
      document.getElementById("Mapa") as HTMLElement,
      {
          center: { lat: -34.60695148718977, lng: -58.443925928680294 },
          fullscreenControl: false,
          scrollwheel: false,
          zoomControl: false,
          zoom:12, 
          mapId:'a13647e5271fd4a1',
      } as google.maps.MapOptions
    );  

    this.api.localidades().subscribe(resp=>
      this.Localidades=resp
    )
  }

  Mostrar(){
    if(this.ctype=="password"){
      this.ctype="text";
    }else{
        this.ctype="password";
    }
  }
  Mostrar2(){
    if(this.ctype2=="password"){
      this.ctype2="text";
    }else{
        this.ctype2="password";
    }
  }
  loc(){
    this.Localidades.forEach(element => {
      if(element.LocalidadID==(<HTMLInputElement>document.getElementById("localidademp")).value){
        this.lat=element.lat;
        this.lon=element.lon;
      }
    });
  }
  crearEmp(){

  }
}
