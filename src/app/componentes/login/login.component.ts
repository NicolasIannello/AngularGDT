import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    typecontra:string;
    contra:string;
    user:string;
    spinnertext:string="Ingresar";
    spinner:string="";

    constructor(public api:LoginService, private router: Router) { 
        this.typecontra="password";
        this.contra="";
        this.user="";
    }

    ngOnInit(): void {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.location.replace("https://mobile-gdt-iannello.herokuapp.com");
        }

        if(localStorage.getItem('Tipo') == 'empresa'){
            this.router.navigate(['/Empresa']);
        }else if(localStorage.getItem('Tipo') == 'cliente'){
            this.router.navigate(['/Cliente']);
        }
    }

    Mostrar(){
        if(this.typecontra=="password"){
            this.typecontra="text";
        }else{
            this.typecontra="password";
        }
    }

    EnviarIngreso(){
        this.spinner="spinner-border spinner-border-sm";
        this.spinnertext="";
        const formData= new FormData
        formData.append("user", this.user);
        formData.append("contra", this.contra);

        this.api.iniciarsesion(formData).subscribe(texto=>{
            if(texto.Tipo=="cliente"){
                localStorage.setItem('Tipo',texto.Tipo);
                localStorage.setItem('ID',texto.ID);
                this.router.navigate(['/Cliente']);
            }else if(texto.Tipo=="empresa"){
                localStorage.setItem('Tipo',texto.Tipo);
                localStorage.setItem('ID',texto.ID);
                this.router.navigate(['/Empresa']);
            }else{
                //alert(texto);
                Swal.fire({title:texto,confirmButtonText:'Aceptar',confirmButtonColor:'#22313f'});
                this.spinner="";
                this.spinnertext="Ingresar";
            }
        })
    }
    Registro(){
        this.router.navigate(['/Registro']);
    }
}
