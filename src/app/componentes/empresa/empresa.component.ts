import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
	selector: 'app-empresa',
	templateUrl: './empresa.component.html',
	styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
	servicios: Array<any> = [];
	User: Array<any> = [{ NombreUsuario: "User" }];
	Turnos: Array<any> = [];
	Clientes: Array<any> = [];
	//ID: string = JSON.parse(localStorage.getItem('ID') || '{}');

	servicio: string = "";
	fechafin: string = "";
	horainicio: string = "";
	horafin: string = "";
	duracionmin: string = "";
	capacidad: string = "";
	dia1: boolean = false;
	dia2: boolean = false;
	dia3: boolean = false;
	dia4: boolean = false;
	dia5: boolean = false;
	dia6: boolean = false;
	dia7: boolean = false;

	datoelim: string = "";
	typeDelim: string = "text";

	fechacarg:string="";
	timecarg:string="";
	cliecarg:string="";
	serviciocarg:string="";

	spinnerclass: string = "";
	spinnertext: string = "Generar turnos";
	spinnerelim: string = "";
	spinnerelimtext: string = "Eliminar turnos";
	spinnerclietext:string="Cargar turno";
	spinnerclie:string="";

	constructor(private router: Router, public api: EmpresaService) {
	}

	ngOnInit(): void {

		if (localStorage.getItem('Tipo') != 'empresa') {
			this.router.navigate(['']);
		}

		this.api.cargarServicios().subscribe(resp =>
			this.servicios = resp
		)

		const formData = new FormData
		formData.append("ID", JSON.parse(localStorage.getItem('ID') || '{}'));

		this.api.traerNombre(formData).subscribe(resp =>
			this.User = resp
		)

		this.api.cargarTurno(formData).subscribe(resp =>
			this.Turnos = resp
		)

		this.api.cargarClientes(formData).subscribe(resp =>
			this.Clientes = resp
		)
	}

	cerrarsesion() {
		localStorage.removeItem('ID');
		localStorage.removeItem('Tipo');
		this.router.navigate(['']);
	}
	Generar() {
		if (this.servicio == "" || this.fechafin == "" || this.horainicio == "" || this.horafin == "" || this.duracionmin == "" || this.capacidad == "") {
			alert("Complete todos los campos");
		} else if (this.dia1 == false && this.dia2 == false && this.dia3 == false && this.dia4 == false && this.dia5 == false && this.dia6 == false && this.dia7 == false) {
			alert("Debe seleccionar al menos un dia de la semana");
		} else if (this.horainicio >= this.horafin) {
			alert("Revise horarios ingresados");
		} else {
			(<HTMLInputElement>document.getElementById('generar')).disabled = true;
			this.spinnerclass = "spinner-border spinner-border-sm";
			this.spinnertext = "";

			const formData = new FormData
			formData.append("servicio", this.servicio);
			formData.append("Monday", String(this.dia1));
			formData.append("Tuesday", String(this.dia2));
			formData.append("Wednesday", String(this.dia3));
			formData.append("Thursday", String(this.dia4));
			formData.append("Friday", String(this.dia5));
			formData.append("Saturday", String(this.dia6));
			formData.append("Sunday", String(this.dia7));
			formData.append("FechaFin", this.fechafin);
			formData.append("HoraInicio", this.horainicio);
			formData.append("HoraFin", this.horafin);
			formData.append("DuracionMin", this.duracionmin);
			formData.append("Capacidad", this.capacidad);
			formData.append("ID", JSON.parse(localStorage.getItem('ID') || '{}'));

			this.api.crearTurno(formData).subscribe(resp => {
				if (resp == "superpuesto") {
					alert("No se pudo crear el turno, horarios superpuestos con otro turno");
				} else {
					alert('Turnos creados')
					this.Turnos = resp
				}
				(<HTMLInputElement>document.getElementById('generar')).disabled = true;
				this.spinnerclass = "";
				this.spinnertext = "Generar turnos";
			})
		}
	}
	serviID() {
		this.servicio = (<HTMLInputElement>document.getElementById("servicio")).value;
	}
	serviCarg() {
		this.serviciocarg = (<HTMLInputElement>document.getElementById("serviciocarg")).value;
	}
	eliminarTurno() {
		if (this.datoelim == "") {
			alert("Ingrese el dato para eliminar")
		} else {
			if (confirm('Esta por eliminar un turno. Presione aceptar para continuar')) {
				(<HTMLInputElement>document.getElementById('datoelim')).disabled = true;
				this.spinnerelim = "spinner-border spinner-border-sm";
				this.spinnerelimtext = "";

				const formData = new FormData
				formData.append("dato", this.datoelim);
				formData.append("tipo", (<HTMLInputElement>document.getElementById("tipoelim")).value);
				formData.append("ID", JSON.parse(localStorage.getItem('ID') || '{}'));

				this.api.Eliminar(formData).subscribe((resp) => {
					if (resp == "no encontrado") {
						alert("No se pudo encontrar un turno con dicho valor");
					} else {
						alert("Turnos eliminados")
						this.Turnos = resp
					}
					(<HTMLInputElement>document.getElementById('datoelim')).disabled = false;
					this.spinnerelim = "";
					this.spinnerelimtext = "Eliminar turnos";
				})
			}
		}
	}
	selectelim() {
		if ((<HTMLInputElement>document.getElementById("tipoelim")).value == "Fecha") {
			this.typeDelim = "date";
			this.datoelim = "";
		} else {
			this.typeDelim = "text";
			this.datoelim = "";
		}
	}
	cargarCliente(){
		if(this.fechacarg=='' || this.serviciocarg=='' || this.timecarg=='' || this.cliecarg=='' ){
			alert('Complete todos los campos antes de continuar');
			alert(this.fechacarg+' '+this.serviciocarg+' '+this.timecarg+' '+this.cliecarg)
		}else{
			(<HTMLInputElement>document.getElementById('cargar')).disabled = true;
			this.spinnerclie = "spinner-border spinner-border-sm";
			this.spinnerclietext = "";

			const formData = new FormData
			formData.append("fecha",this.fechacarg);
			formData.append("servicio",this.serviciocarg);
			formData.append("time",this.timecarg);
			formData.append("cliente",this.cliecarg);
			formData.append("ID",JSON.parse(localStorage.getItem('ID') || '{}'));

			this.api.crearCliente(formData).subscribe(resp=>{
				if(resp=="Usuario no encontrado"  || resp=="No se encontro un turno disponible" || resp=="Ya existe un turno vinculado a esa cuenta en dicho horario"){
					(<HTMLInputElement>document.getElementById('cargar')).disabled = false;
					this.spinnerclie = "";
					this.spinnerclietext = "Cargar turno";
					alert(resp);
				}else{
					(<HTMLInputElement>document.getElementById('cargar')).disabled = false;
					this.spinnerclie = "";
					this.spinnerclietext = "Cargar turno";
					this.Clientes=resp
					alert("Turno cargado con exito");
				}
			})
		}
	}
}
