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
	ubicacion:string="";

	ctype:string="password";
	ctype2:string="password";

	spinner:string="";
	spinnertext:string="Crear cuenta";

	marker=new google.maps.Marker();
	map:any;
  
  	constructor(public api: RegistroService, private router: Router) { }

  	ngOnInit(): void {
		this.api.localidades().subscribe(resp=>
			this.Localidades=resp
		)

		this.map= new google.maps.Map(
			document.getElementById("Mapa") as HTMLElement,
			{
				center: { lat: -34.60695148718977, lng: -58.443925928680294 },
				fullscreenControl: false,
				zoom:12, 
				mapId:'a13647e5271fd4a1',
			} as google.maps.MapOptions
		);  

		this.map.addListener("click", (mapsMouseEvent:any) => {
			
			this.marker.setPosition(mapsMouseEvent.latLng);
			this.marker.setMap(this.map);

			this.api.Geocode(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng()).subscribe(resp=>
				this.ubicacion=resp.display_name
			)
		})
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
				this.map.setCenter(new google.maps.LatLng(element.lat, element.lon));
				this.map.setZoom(14);
				this.localidad=(<HTMLInputElement>document.getElementById("localidademp")).value
			}
		});
	}
	crearEmp(){
		if(this.nombre=="" || this.localidad=="" || this.mail=="" || this.contra=="" || this.contra2=="" || this.ubicacion==""){
			alert("Complete todos los campos");
		}else if(this.contra!=this.contra2){
			alert("Las contraseñas no coinciden");
		}else if(/*(this.mail.includes("@") && this.mail.includes(".com"))*/this.mail.match(/^(w{3}\.)?([A-z]||[0-9])+@([A-z]||[0-9]){1,6}\.com(\.[a-z]{2})?$/g) ){
			//document.getElementById('crearemp').disabled=true;
			this.spinner = "spinner-border spinner-border-sm";
			this.spinnertext = "";
			
			const formData=new FormData
			formData.append("nomemp",this.nombre);
			formData.append("localidademp",this.localidad);
			formData.append("mailemp",this.mail);
			formData.append("ubicacion",this.ubicacion);
			formData.append("contraemp",this.contra);
			formData.append("contraemp2",this.contra2);

			this.api.crearEmp(formData).subscribe(resp=>{
				this.spinner = "";
				this.spinnertext = "Crear cuenta";
				alert(resp)
			})
		}else{
			alert("Ingrese un email valido");
		}
	}
	ReGeo(){
		this.api.ReverseGeocode(this.ubicacion).subscribe(resp=>{
			this.marker.setPosition({lat: parseFloat(resp[0].lat), lng: parseFloat(resp[0].lon)});
			this.marker.setMap(this.map); 
		},
		error => {                             
			alert('Ubicacion no encontrada');
		})
	}
}
