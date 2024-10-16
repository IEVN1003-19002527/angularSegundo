import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from "./formularios/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from "./formularios/zodiaco/zodiaco.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ejemplo1Component, ZodiacoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}

onsubmit(): void{

  localStorage.setItem('nombre',this.nombre)
  const{nombre, edad, email}=this.formGroup.value;

  this.persona.nombre=nombre;
  this.persona.edad=edad;
  this.persona.email=email;

  let personaJSON=JSON.stringify(this.persona);
  localStorage.setItem('persona', personaJSON);

  //console.log(this.persona);
}