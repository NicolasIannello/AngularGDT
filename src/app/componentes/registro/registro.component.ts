import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('Tipo') == 'empresa'){
      this.router.navigate(['/Empresa']);
    }else if(localStorage.getItem('Tipo') == 'cliente'){
        this.router.navigate(['/Cliente']);
    }
  }

  irLogin(){
    this.router.navigate(['/']);
  }
  
}
