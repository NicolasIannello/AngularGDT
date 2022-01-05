import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appBoton]'
})
export class BotonDirective {

  constructor(public obj:ElementRef) {}

  @HostListener('click')onClick(){
    this.obj.nativeElement.classList.add('diaclicked');
  }
  
}
