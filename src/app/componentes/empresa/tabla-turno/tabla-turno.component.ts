import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-tabla-turno',
  templateUrl: './tabla-turno.component.html',
  styleUrls: ['./tabla-turno.component.css']
})
export class TablaTurnoComponent implements OnInit {
  servicios:Array<any>=[];

  constructor(private router: Router, public api:EmpresaService) {
  }

  ngOnInit(): void {
    this.api.cargarServicios().subscribe(texto=>
      this.servicios=texto
    )
  }
}
