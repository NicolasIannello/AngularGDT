import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rcliente',
  templateUrl: './rcliente.component.html',
  styleUrls: ['./rcliente.component.css']
})
export class RclienteComponent implements OnInit {
  passclie:string="password";
  passclie2:string="password";

  nombre:string="";
  apellido:string="";
  contra:string="";
  contra2:string="";
  mail:string="";
  user:string="";

  spinnerclie:string="";
  spinnertext:string="Crear cuenta"

  constructor(public api: RegistroService, private router: Router) { }

  ngOnInit(): void {
  }

  Mostrar1(){
    if(this.passclie=="password"){
      this.passclie="text";
    }else{
        this.passclie="password";
    }
  }
  Mostrar2(){
    if(this.passclie2=="password"){
      this.passclie2="text";
    }else{
        this.passclie2="password";
    }
  }
  crearClie(){
    if(this.nombre=="" || this.apellido=="" || this.contra=="" || this.user=="" || this.contra2=="" || this.mail==""){
      alert("Complete todos los campos");
    }else if(this.contra!=this.contra2){
      alert("Las contraseñas no coinciden");
    }else if(this.mail.match(/^(w{3}\.)?([A-z]||[0-9])+@([A-z]||[0-9]){1,6}\.com(\.[a-z]{2})?$/g)){
      (<HTMLInputElement>document.getElementById("crearclie")).disabled=true;
      this.spinnerclie = "spinner-border spinner-border-sm";
      this.spinnertext = "";

      const datos=new FormData;
      datos.append("nomclie",this.nombre);
      datos.append("apeclie",this.apellido);
      datos.append("passclie",this.contra);
      datos.append("userclie",this.user);
      datos.append("passclie2",this.contra2);
      datos.append("mailclie",this.mail);

      this.api.crearClie(datos).subscribe(resp=>{
        (<HTMLInputElement>document.getElementById("crearclie")).disabled=false;
        this.spinnerclie = "";
        this.spinnertext = "Crear cuenta";
        alert(resp)
        if(resp=="Cuenta de cliente creada con exito"){
          this.router.navigate(['/']);
        }
      })
    }else{
      alert("Ingrese un email valido");
    }
  }
}
