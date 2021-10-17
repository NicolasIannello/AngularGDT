import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
  servicios: Array<any> = [];
  localidades: Array<any> = [];
  horarios:Array<any>=[];
  Turnos:Array<any>=[];
  @Output() CTurnos = new EventEmitter<any>();

  servicio:string="";
  localidad:string="";
  dia:string="";
  horario:string="";

  marcadores:Array<any>=[];
  //marker=new google.maps.Marker();
	map:any;

  respuesta:Array<any>=[];
  nombreclicked:string="";
  fechas:Array<any>=[];
  calendario:Array<any>=[{mes:'',dia: '',disp: false}];

  spB:string="";
  spBtext:string="Buscar servicios";
  screar:string="";
  screartext:string="Sacar turno"

  constructor(public api:ClienteService) { }

  ngOnInit(): void {
    this.api.servicios().subscribe(resp=>
      this.servicios=resp
    )
    this.api.localidades().subscribe(resp=>
      this.localidades=resp
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
  }

  serv(){
    this.servicio=(<HTMLInputElement>document.getElementById("servicio")).value
  }
  loc(){
    this.localidad=(<HTMLInputElement>document.getElementById("localidademp")).value
  }
  BServicio(){
    if(this.servicio=="" || this.localidad==""){
      alert("Complete servicio y localidad");
    }else{
      this.spB = "spinner-border spinner-border-sm";
      this.spBtext = "";

      const formData = new FormData
      formData.append("serv",this.servicio);
      formData.append("loc",this.localidad);

      this.api.buscarServicios(formData).subscribe(resp=>{
        this.spB = "";
        this.spBtext = "Buscar servicios";

        this.marcadores.forEach(element => {
          element.setMap(null)
        });
        this.marcadores=[];

        this.localidades.forEach(element => {
          if(element.LocalidadID==(<HTMLInputElement>document.getElementById("localidademp")).value){
            this.map.setCenter(new google.maps.LatLng(element.lat, element.lon));
            this.map.setZoom(14);
          }
        });

        this.respuesta=resp
        this.respuesta.forEach(elemento => {
          this.api.ReGeo(elemento.Ubicacion).subscribe(res=>{
            var lat=parseFloat(res[0].lat), lon=parseFloat(res[0].lon);

            const marker =new google.maps.Marker();
            marker.setPosition({lat: lat, lng: lon})
            marker.setMap(this.map)
            marker.setTitle(elemento.NombreUsuario)            
            marker.addListener("click", () => {
              this.nombreclicked=elemento.NombreUsuario;

              const formData = new FormData()
              formData.append('nom',this.nombreclicked)
              formData.append('ubi',elemento.Ubicacion)
              formData.append('serv',this.servicio)

              this.fechas=[]
              this.api.diaServicios(formData).subscribe(resp=>{
                for (let i = 0; i < resp.length; i++) {
                  let datomes={mes:'',cant:0,mesnum:0,dia:''};
                  let x=new Date(); let hoy=x.getDate() 
                  if( ( hoy<new Date(resp[i].Dia).getDate() && new Date(x).getMonth()==new Date(resp[i].Dia).getMonth() ) || new Date(x).getMonth()!=new Date(resp[i].Dia).getMonth() ){

                    switch(new Date(resp[i].Dia).getMonth()){
                      case 0: datomes ={mes:"Enero",cant:31,mesnum:1,dia: resp[i].Dia}; break;
                      case 1: datomes ={mes:"Febrero",cant:28,mesnum:2,dia: resp[i].Dia}; break;
                      case 2: datomes ={mes:"Marzo",cant:31,mesnum:3,dia: resp[i].Dia}; break;
                      case 3: datomes ={mes:"Abril",cant:30,mesnum:4,dia: resp[i].Dia}; break;
                      case 4: datomes ={mes:"Mayo",cant:31,mesnum:5,dia: resp[i].Dia}; break;
                      case 5: datomes ={mes:"Junio",cant:30,mesnum:6,dia: resp[i].Dia}; break;
                      case 6: datomes ={mes:"Julio",cant:31,mesnum:7,dia: resp[i].Dia}; break;
                      case 7: datomes ={mes:"Agosto",cant:31,mesnum:8,dia: resp[i].Dia}; break;
                      case 8: datomes ={mes:"Septiembre",cant:30,mesnum:9,dia: resp[i].Dia}; break;
                      case 9: datomes ={mes:"Octubre",cant:31,mesnum:10,dia: resp[i].Dia}; break;
                      case 10: datomes ={mes:"Noviembre",cant:30,mesnum:11,dia: resp[i].Dia}; break;
                      case 11: datomes ={mes:"Diciembre",cant:31,mesnum:12,dia: resp[i].Dia}; break;
                    }
                    this.fechas.push(datomes);
                  }
                }

              })

            });

            this.marcadores.push(marker)
          },
          error=>{
          })

        });
      })
    }
  }
  mostrarfecha(dia:any){
    this.dia=dia
    var dato=new FormData();
    dato.append("fecha",dia);
    dato.append("nom",this.nombreclicked);

    this.api.horarios(dato).subscribe(resp=>{
      this.horarios=resp      
    })
  }
  hora(){
    this.horario=(<HTMLInputElement>document.getElementById("horarios")).value
  }
  crearTurno(){
    this.screar="spinner-border spinner-border-sm"
    this.screartext="";
    var dato=new FormData();
    dato.append("serv",this.servicio);
    dato.append("loc",this.localidad);
    dato.append("nom",this.nombreclicked);
    dato.append("fecha",this.dia);
    dato.append("horario",this.horario);
    dato.append("ID",this.ID);

    this.api.crearTurno(dato).subscribe(resp=>{
      if(resp=="Se han agotado los cupos para ese horario"){
        alert("Se han agotado los cupos para ese horario");	
        this.horarios=[]	
        this.mostrarfecha(this.dia)
      }else{
        alert(resp);
        var dato=new FormData();
        dato.append("ID",this.ID);
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
          this.CTurnos.emit(this.Turnos);
        })
      }
      this.screar="";
      this.screartext="Sacar turno";
    })
  }
}
