import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() Turnos!: Array<any>;
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');

  constructor(public api:ClienteService) { }

  ngOnInit(): void {
  }
  Eliminar(id:any){
    if(confirm('Esta por eliminar un turno. Presione aceptar para continuar')){
      var dato=new FormData();
      dato.append("IDtce",id);
      dato.append("IDclie",this.ID);

      this.api.Eliminar(dato).subscribe(resp=>{
        alert(resp);
        var dato=new FormData();
	      dato.append("ID",this.ID);
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
        })
      })
    }
  }
}
