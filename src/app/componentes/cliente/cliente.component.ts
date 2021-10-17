import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
  User: Array<any> = [{ NombreUsuario: "User" }];
  Turnos:Array<any>=[];

  constructor(public api:ClienteService, private router: Router) { 
  }

  ngOnInit(): void {
    if (localStorage.getItem('Tipo') != 'cliente') {
			this.router.navigate(['']);
		}
		const formData = new FormData
		formData.append("ID", this.ID);

    this.api.traernom(formData).subscribe(resp=>{
      this.User=resp;
    })

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
    })
  }

  cerrarsesion(){
    localStorage.removeItem('ID');
	  localStorage.removeItem('Tipo');
    this.router.navigate(['']);
  }
  cambiarTurnos($event:any){
    this.Turnos=$event
  }
}
