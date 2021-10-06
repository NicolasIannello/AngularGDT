import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    typecontra:string;

    constructor() { 
        this.typecontra="password";
    }

    ngOnInit(): void {

    }

    Mostrar(){
        if(this.typecontra=="password"){
            this.typecontra="text";
        }else{
            this.typecontra="password";
        }
    }

    EnviarIngreso(){

    }
}
