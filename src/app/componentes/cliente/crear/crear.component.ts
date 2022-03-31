import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  //ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
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
  nombreclicked:string="Calendario";
  fechas:Array<any>=[];
  calendario:Array<any>=[{mes:'',dia: '',disp: false}];

  spB:string="";
  spBtext:string="Buscar servicios";
  screar:string="";
  screartext:string="Sacar turno"

  mes:string="a";
  sigdia:any='';
  diacss:string="dia"
  diaselecss:string="dia diaselected"
  claseant:string=""
  cont:number=0;

  check:boolean=false;
  celular:string="";

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
    this.fechas=[];this.nombreclicked="Calendario";this.horarios=[];
    if(this.servicio=="" || this.localidad==""){
      Swal.fire({title:'Complete servicio y localidad',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
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
                this.mes='a';
                this.cont=0;
                //var cantpasado=0
                var diapasado=0
                let mes={mes:""};
                var ultmes="x";
                //console.log(resp);
                for (let i = 0; i < resp.length; i++) {
                  let x=new Date(); let hoy=x.getDate() 
                  let datomes={dia:hoy,class:"",fecha:""};
                  //console.log(hoy);

                  if( new Date(x).getFullYear()<=new Date(resp[i].Dia).getFullYear() && (hoy<=new Date(resp[i].Dia).getDate() && new Date(x).getMonth()==new Date(resp[i].Dia).getMonth()) || (new Date(x).getMonth()<new Date(resp[i].Dia).getMonth()) ){
                  //if( ( hoy<=new Date(resp[i].Dia).getDate() && new Date(x).getMonth()<=new Date(resp[i].Dia).getMonth() && new Date(x).getFullYear()<=new Date(resp[i].Dia).getFullYear() ) /*|| new Date(x).getMonth()!=new Date(resp[i].Dia).getMonth()*/ ){
                    //console.log('entre hoy: '+hoy+' fecha: '+(new Date(resp[i].Dia).getDate()+1)+' mes hoy '+new Date(x).getMonth()+' mes fecha '+new Date(resp[i].Dia).getMonth());
                    
                    switch(new Date(resp[i].Dia).getMonth()){
                      case 0: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Enero","Febrero",31);break;
                      case 1: diapasado=this.armarCalendario(diapasado,resp,datomes,i,28,"Febrero","Marzo",31);break;
                      case 2: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Marzo","Abril",28);break;
                      case 3: diapasado=this.armarCalendario(diapasado,resp,datomes,i,30,"Abril","Mayo",31);break;
                      case 4: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Mayo","Junio",30);break;
                      case 5: diapasado=this.armarCalendario(diapasado,resp,datomes,i,30,"Junio","Julio",31);break;
                      case 6: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Julio","Agosto",30);break;
                      case 7: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Agosto","Septiembre",31);break;
                      case 8: diapasado=this.armarCalendario(diapasado,resp,datomes,i,30,"Septiembre","Octubre",31);break;
                      case 9: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Octubre","Noviembre",30);break;
                      case 10: diapasado=this.armarCalendario(diapasado,resp,datomes,i,30,"Noviembre","Diciembre",31);break;
                      case 11: diapasado=this.armarCalendario(diapasado,resp,datomes,i,31,"Diciembre","Enero",30);break;
                    }
                  }
                }
                //console.log(resp);
              })
              //console.log(this.fechas);
            });

            this.marcadores.push(marker)
          },
          error=>{
          })

        });
      })
    }
  }
  mostrarfecha(dia:any,clase:any){
    if(this.dia!=''){
      document.getElementById(this.dia)!.className=this.claseant;
    }
    if(dia==""){
      Swal.fire({title:'Dia no disponible',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
      this.horarios=[]
    }else{
      this.dia=dia
      this.claseant=clase
    
      var dato=new FormData();
      dato.append("fecha",dia);
      dato.append("nom",this.nombreclicked);
  
      this.api.horarios(dato).subscribe(resp=>{
        this.horarios=resp      
      })
    }
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
    dato.append("ID",(localStorage.getItem('ID') || '{}'));

    if(this.check==true && this.celular.match(/^[0-9]{2,3}\ ?[0-9]{3,4}(\ |-)?[0-9]{4}$/g)){
      //this.celular="+549"+this.celular;
      dato.append("cel","+549"+this.celular);
      dato.append("msgenv",this.check.toString());
    }else if(this.check==true){
      Swal.fire({title:'Ingrese un numero valido',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
      this.screar="";
      this.screartext="Sacar turno";
    }else if(this.check==false){
      dato.append("cel","this.celular");
      dato.append("msgenv",this.check.toString());
    }

    if(this.horario=="" && (this.check==false || (this.check==true && this.celular.match(/^[0-9]{2,3}\ ?[0-9]{3,4}(\ |-)?[0-9]{4}$/g)))){
      Swal.fire({title:'complete todos los campos',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
      this.screar="";
      this.screartext="Sacar turno";
    }else{
      this.api.crearTurno(dato).subscribe(resp=>{
        if(resp=="Se han agotado los cupos para ese horario"){
          Swal.fire({title:'Se han agotado los cupos para ese horario',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});	
          this.horarios=[]	
          this.mostrarfecha(this.dia,'dia diaselected')
        }else{
          Swal.fire({title:resp,confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
          var dato=new FormData();
          dato.append("ID",JSON.parse(localStorage.getItem('ID') || '{}'));
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
  armarCalendario(diapasado:any,resp:any,datomes:any,i:any,cant:any,mes:any,messig:any,cantpasada:any){
    //console.log('Dia '+(new Date(resp[i].Dia).getDate()+1)+' '+i+' '+' '+cant+' '+new Date(resp[i].Dia).getMonth())
    if( new Date(resp[i].Dia).getDate()+1>cant){
      //console.log('1er '+(new Date(resp[i].Dia).getDate()+1)+' '+i+' '+' '+cant)
      var x = {mes: messig}; 
      this.fechas.push(x);
      var y = {dia: 'D',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'L',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'M',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'M',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'J',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'V',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'S',class:"dia",fecha: "semana"}; this.fechas.push(y);
      /*@ts-ignore*/switch (new Date(resp[i].Dia).getDay()) {
        /*@ts-ignore*/case 6: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 5: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 4: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 3: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 2: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 1: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        case 0: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y); break;
      }
      this.mes=messig
    }else if (this.mes!=mes){
      //console.log('2do '+(new Date(resp[i].Dia).getDate()+1)+' '+new Date(resp[i].Dia).getDay())
      var hopl=new Date(resp[i].Dia)
      hopl.setDate(hopl.getDate() - hopl.getDate() +1 )
      //console.log( hopl.getDate());
      
      var x = {mes: mes}; 
      this.fechas.push(x);
      var y = {dia: 'D',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'L',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'M',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'M',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'J',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'V',class:"dia",fecha: "semana"}; this.fechas.push(y);
      y = {dia: 'S',class:"dia",fecha: "semana"}; this.fechas.push(y);
      if(this.cont==0){
        /*@ts-ignore*/switch (new Date(resp[i].Dia).getDay()) {  
        /*@ts-ignore*/case 6: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 5: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 4: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 3: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 2: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
        /*@ts-ignore*/case 1: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          case 0: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y); break;
        }
        this.cont++;
      }else{
        /*@ts-ignore*/switch (hopl.getDay()-1) {  
          /*@ts-ignore*/case 6: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          /*@ts-ignore*/case 5: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          /*@ts-ignore*/case 4: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          /*@ts-ignore*/case 3: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          /*@ts-ignore*/case 2: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          /*@ts-ignore*/case 1: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y);
          case 0: y = {dia: '/',class:"dia",fecha: "fill"}; this.fechas.push(y); break;
        } 
      }
      this.mes=mes
    }

    if(i<resp.length-1){
      this.sigdia=new Date(resp[i+1].Dia).getDate()+1
    }
    if(new Date(resp[i].Dia).getDate()+1>cant){      
      datomes = {dia: 1,class:"dia diaselected",fecha: resp[i].Dia}; 
      this.fechas.push(datomes);
      /*for (let j = 2; j < this.sigdia; j++) {                              
        datomes = {dia: j,class:"dia",fecha: ""};
        this.fechas.push(datomes); 
      }*/
    }else{
      if(diapasado>new Date(resp[i].Dia).getDate()+1){
        //console.log(diapasado+' '+(new Date(resp[i].Dia).getDate()+1));
        let n;
        if(cantpasada>=diapasado){
          n=1;
        }else{
          n=2;
        }
        //alert(new Date(resp[i].Dia).getDate()+1+' '+cantpasada+' '+diapasado+' ')
        for (n; n < new Date(resp[i].Dia).getDate()+1; n++) { 
          datomes = {dia: n,class:"dia",fecha: ""};
          this.fechas.push(datomes); 
        }
        datomes = {dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
        this.fechas.push(datomes);
        if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<cant){
          for (let j = new Date(resp[i].Dia).getDate()+2; j <= cant; j++) {
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }else if(this.sigdia>new Date(resp[i].Dia).getDate()+1){
          for (let j = new Date(resp[i].Dia).getDate()+2; j < this.sigdia; j++) {      
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }
      }else{
        datomes = {dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
        this.fechas.push(datomes);
        //alert(new Date(resp[i].Dia).getDate()+1+' '+i+' '+(resp.length-1)+' '+cant)
        if(/*i==resp.length-1 &&*/this.sigdia<new Date(resp[i].Dia).getDate()+1 && new Date(resp[i].Dia).getDate()+1<cant){
          for (let j = new Date(resp[i].Dia).getDate()+2; j <= cant; j++) {
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }else if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<cant){
          for (let j = new Date(resp[i].Dia).getDate()+2; j <= cant; j++) {
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }else if(this.sigdia>new Date(resp[i].Dia).getDate()+1){
          for (let j = new Date(resp[i].Dia).getDate()+2; j < this.sigdia; j++) {                              
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }
      }
    }
    diapasado=new Date(resp[i].Dia).getDate()+1
    return diapasado
  }
}
