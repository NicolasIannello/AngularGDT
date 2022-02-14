import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() Turnos!: Array<any>;
  //ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
  cel:string="";
  elim:string="false";
  conf:string='false';

  constructor(public api:ClienteService) { }

  ngOnInit(): void {
  }
  async Eliminar(id:any){
    this.conf="false";
    const { value: formValues } = await Swal.fire({
      title: 'Esta por eliminar un turno',text: "Presione aceptar para continuar",
      showCancelButton: true,confirmButtonColor:'#22313f',cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',confirmButtonText: 'Aceptar',
      footer:'<div class="container"><div class="row"><b>En caso de querer recibir una notificacion via WhatsApp ingrese su numero debajo</b></div>'+
      '<div class="row"><input type="text" id="cel" style="width:80%;" class="swal2-input" [(ngModel)]="cel"></div></div>',
      preConfirm: () => { this.cel=(<HTMLInputElement>document.getElementById('cel')).value;this.conf="true" 
                          return (<HTMLInputElement>document.getElementById('cel')).value;
                        }
    });

    if (/*formValues || !formValues*/ this.conf=="true") {
      var dato=new FormData();
      dato.append("IDtce",id);
      dato.append("IDclie",JSON.parse(localStorage.getItem('ID') || '{}'));

      if(this.cel==""){
        this.elim='true';
        dato.append("cel","+549"+this.cel);
        dato.append('env','false');
      }else if(this.cel.match(/^[0-9]{2,3}\ ?[0-9]{3,4}(\ |-)?[0-9]{4}$/g)){
        this.elim='truecel';
        dato.append("cel","+549"+this.cel);
        dato.append('env','true');
      }else{
        this.elim='false';
        Swal.fire({title:'Ingrese un numero valido',confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'})
      }
      if(this.elim=='truecel' || this.elim=='true'){
        this.api.Eliminar(dato).subscribe(resp=>{
          Swal.fire({title:resp,confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'})
          var dato=new FormData();
          dato.append("ID",JSON.parse(localStorage.getItem('ID') || '{}'));
          this.api.cargarTurnos(dato).subscribe(resp=>{
            this.Turnos=resp
          })
        })
      }
    }
    /*if(confirm('Esta por eliminar un turno. Presione aceptar para continuar')){
      var dato=new FormData();
      dato.append("IDtce",id);
      dato.append("IDclie",JSON.parse(localStorage.getItem('ID') || '{}'));

      this.api.Eliminar(dato).subscribe(resp=>{
        alert(resp);
        var dato=new FormData();
	      dato.append("ID",JSON.parse(localStorage.getItem('ID') || '{}'));
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
        })
      })
    }*/
  }
}
