import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resistencias2',
  templateUrl: './resistencias2.component.html',
  styleUrls: ['./resistencias2.component.css'],
  standalone: true, // Indica que este componente puede ser autónomo (Angular 14+)
  imports: [ReactiveFormsModule, CommonModule]
})
export default class Resistencias2Component implements OnInit {
  // Array de colores utilizados para calcular el valor de la resistencia
  colors: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  
  // Mapa que asocia cada color con su código hexadecimal
  colorCodes: { [key: string]: string } = {
    'Negro': 'black',
    'Café': '#8B4513',
    'Rojo': 'red',
    'Naranja': 'orange',
    'Amarillo': 'yellow',
    'Verde': 'green',
    'Azul': 'blue',
    'Violeta': 'violet',
    'Gris': 'gray',
    'Blanco': 'white'
  };

  resistenciaForm!: FormGroup; // Formulario reactivo para la resistencia
  valor: number = 0; // Valor calculado de la resistencia
  valorMaximo: number = 0; // Valor máximo de la resistencia considerando tolerancia
  valorMinimo: number = 0; // Valor mínimo de la resistencia considerando tolerancia
 resultado: boolean = false; // Indica si se ha calculado el resultado
  resultadosGuardados: any[] = []; // Nueva propiedad para almacenar los resultados guardados
  datosImpresos: Array<{ color1: string, color2: string, color3: string, tolerancia: string, valor: string, valorMaximo: number, valorMinimo: number, color1Code: string, color2Code: string, color3Code: string }> = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializa el formulario reactivo con validaciones
    this.resistenciaForm = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required], 
      color3: ['', Validators.required], 
      tolerancia: ['', Validators.required] // Tolerancia
    });

    this.cargarResultadosDesdeLocalStorage(); // Carga los resultados al iniciar
  }

  registrar() {
    // Obtiene los valores de los colores seleccionados
    const valorColor1 = this.colors.indexOf(this.resistenciaForm.value.color1);
    const valorColor2 = this.colors.indexOf(this.resistenciaForm.value.color2);
    const multiplicador = this.colors.indexOf(this.resistenciaForm.value.color3);
    
    // Calcula el valor de la resistencia
    this.valor = (valorColor1 * 10 + valorColor2) * Math.pow(10, multiplicador);

    // Determina la tolerancia en función del color seleccionado
    const tolerancia = this.resistenciaForm.value.tolerancia === 'oro' ? 5 : 10;
    this.valorMaximo = this.valor + (this.valor * tolerancia) / 100; // Valor máximo
    this.valorMinimo = this.valor - (this.valor * tolerancia) / 100; // Valor mínimo
    
    this.resultado = true; // Indica que el resultado ha sido calculado

    // Actualiza la lista de resultados guardados
    this.resultadosGuardados.push({
      valor: this.valor,
      valorMaximo: this.valorMaximo,
      valorMinimo: this.valorMinimo,
      tolerancia: this.resistenciaForm.value.tolerancia, // Guardar tolerancia
      color1: this.resistenciaForm.value.color1, // Guardar color1
      color2: this.resistenciaForm.value.color2, // Guardar color2
      color3: this.resistenciaForm.value.color3,  // Guardar color3
      color1Code: this.getColorCode(this.resistenciaForm.value.color1), // Guardar código de color1
      color2Code: this.getColorCode(this.resistenciaForm.value.color2), // Guardar código de color2
      color3Code: this.getColorCode(this.resistenciaForm.value.color3)  // Guardar código de color3
    })

    // Guardar todos los resultados en localStorage
    this.guardarResultadosEnLocalStorage(); // Llama a la nueva función para guardar todos los resultados
  }

  // Devuelve el código de color correspondiente al color dado
  getColorCode(color: string): string {
    return this.colorCodes[color];
  }

  // Nueva función para guardar en localStorage
  guardarEnLocalStorage() {
    const datos = {
      valor: this.valor,
      valorMaximo: this.valorMaximo,
      valorMinimo: this.valorMinimo,
      tolerancia: this.resistenciaForm.value.tolerancia
    };
    localStorage.setItem('resistenciaData', JSON.stringify(datos)); // Guarda los datos en localStorage
  }

  // Nueva función para mostrar todos los datos guardados en los resultados
  mostrarResultados() {
    const datosGuardados = localStorage.getItem('resistenciaData');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        console.log('Resultados:', datos); // Muestra los datos guardados en los resultados
    }
  }

  // Nueva función para guardar todos los resultados en localStorage
  guardarResultadosEnLocalStorage() {
    localStorage.setItem('resultadosGuardados', JSON.stringify(this.resultadosGuardados)); // Guarda todos los resultados
  }

  // Nueva función para cargar los resultados desde localStorage al iniciar
  cargarResultadosDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('resultadosGuardados');
    if (datosGuardados) {
      this.resultadosGuardados = JSON.parse(datosGuardados); // Carga los resultados guardados
    }
  }

  // Nueva función para obtener los resultados guardados
  getResultadosGuardados() {
    return this.resultadosGuardados;
  }

  // Devuelve el color de la tolerancia basado en el valor
  getToleranceColor(tolerancia: string): string {
    if (tolerancia === 'oro') {
      return '#FFD700'; 
    } else if (tolerancia === 'plata') {
      return '#C0C0C0'; 
    }
    return '#FFFFFF'; // Por defecto blanco
  }

  // Agregar el método imprimirDatos
  imprimirDatos() {
    this.datosImpresos = this.getResultadosGuardados().map(resultado => ({
      color1: resultado.color1,
      color2: resultado.color2,
      color3: resultado.color3,
      tolerancia: resultado.tolerancia,
      valor: resultado.valor,
      valorMaximo: resultado.valorMaximo,
      valorMinimo: resultado.valorMinimo,
      color1Code: resultado.color1Code, // Agregar código de color1
      color2Code: resultado.color2Code, // Agregar código de color2
      color3Code: resultado.color3Code  // Agregar código de color3
    }));
  }

  // Agregar un método para obtener el estilo de color
  getColorStyle(colorCode: string): { [key: string]: string } {
    return { 'background-color': colorCode }; // Devuelve el estilo de fondo correspondiente
  }

  // Nueva función para obtener el código hexadecimal del color
  getColorHex(colorCode: string): string {
    const colorMap: { [key: string]: string } = {
      'negro': '#000000',
      'marrón': '#8B4513',
      'rojo': '#FF0000',
      'naranja': '#FFA500',
      'amarillo': '#FFFF00',
      'verde': '#008000',
      'azul': '#0000FF',
      'violeta': '#8A2BE2',
      'gris': '#808080',
      'blanco': '#FFFFFF',
      'café': '#A52A2A'
    };
    return colorMap[colorCode] || '#FFFFFF'; // Por defecto blanco si no se encuentra el código de color
  }
}
