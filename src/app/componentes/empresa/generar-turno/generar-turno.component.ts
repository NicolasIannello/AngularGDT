import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-generar-turno',
  templateUrl: './generar-turno.component.html',
  styleUrls: ['./generar-turno.component.css']
})
export class GenerarTurnoComponent implements OnInit {
  servicios:Array<any>=[];

  constructor(private router: Router, public api:EmpresaService) {
  }

  ngOnInit(): void {
    this.api.cargarServicios().subscribe(texto=>
      this.servicios=texto
    )
  }

}
