import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  datosForm: FormGroup;
  signosZodiacales = [
    { signo: 'Rata', años: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
    { signo: 'Buey', años: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
    { signo: 'Tigre', años: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
    { signo: 'Conejo', años: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
    { signo: 'Dragón', años: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
    { signo: 'Serpiente', años: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
    { signo: 'Caballo', años: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
    { signo: 'Cabra', años: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027] },
    { signo: 'Mono', años: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028] },
    { signo: 'Gallo', años: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029] },
    { signo: 'Perro', años: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030] },
    { signo: 'Cerdo', años: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031] }
  ];

  nombreCompleto: string = '';
  edad: number = 0;
  signoZodiacal: keyof typeof this.imagenesSignos = 'Rata'; // Inicializar con un signo válido
  urlImagenSigno: string = '';

  imagenesSignos = {
    'Rata': 'https://imgs.search.brave.com/f8yww1S0PZL3vS0AN_AOu38QX92_CpBj3LqMwhaE9tI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXRh/LnZpYWplLWEtY2hp/bmEuY29tL2tjZmlu/ZGVyL3VwbG9hZC92/YWMvcGljL2x1Y2lh/L3JhdGEoMSkuanBn',
    'Buey': 'https://imgs.search.brave.com/i9rA7BSJ9cZD0SDlBp8ABKpmSCG7noXRZyAZV44R5dU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb25m/dWNpb21hZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDEvMDZfaG9yb3Nj/b3BvX2NoaW5vX0J1/ZXkuanBn',
    'Tigre': 'https://imgs.search.brave.com/l8utBPYi46HgXTjHYsxo-72yRopE9n3zQg-T7ZxhRoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25m/dWNpb21hZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDEvMDZfaG9yb3Nj/b3BvX2NoaW5vX1Rp/Z3JlLmpwZw',
    'Conejo': 'https://imgs.search.brave.com/k-cPVElzcSSaF33tZAAuT0gTmjl5zvhVcFY0wkMuLQ8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb25m/dWNpb21hZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDEvMDZfaG9yb3Nj/b3BvX2NoaW5vX0Nv/bmVqby5qcGc',
    'Dragón': 'https://imgs.search.brave.com/Y-8hIEKi_QIGLrtaMpj-U-uFG9LHWulsnwzqE-cXUwY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9lLnJh/ZGlvLWdycHAuaW8v/eGxhcmdlLzIwMjMv/MDEvMTgvMjMwOTIz/XzEzNzY0MDEuanBn',
    'Serpiente': 'https://imgs.search.brave.com/8HgVh9Kl4yvV6voGmNr4TlVqEu6q0vijWJzX83_PXaQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2xhcmluLmNvbS9p/bWcvMjAyNC8xMC8w/My9fcUZCNlRwRjhf/NzIweDBfXzIuanBn/IzE3Mjc5NzIwMzMy/NTE',
    'Caballo': 'https://imgs.search.brave.com/L9K20nkEoriW0SOMlWqAgTpwSXlZnRSbWESFvEPoaH0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZXVyb3Jlc2lkZW50/ZXMuY29tL2hvcm9z/Y29wby1jaGluby8y/MDE3L2ltYWdlbmVz/L2hvcnNlLWV1cm9y/ZXNpZGVudGVzLmpw/Zw',
    'Cabra': 'https://imgs.search.brave.com/S6VEVeb62mkrtnituqpvATEo__Ka_ytVzYx_QeZIn2A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jY2wu/dWFubC5teC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMC8w/Nl9ob3Jvc2NvcG9f/Y2hpbm9fQ2FicmEt/NzY4eDY1Ny0xLmpw/Zw',
    'Mono': 'https://imgs.search.brave.com/yctPNxGGhsxY-hhYECtxaHhLvPiKAe2MIXYA2iw9m5M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb25m/dWNpb21hZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDEvMDZfaG9yb3Nj/b3BvX2NoaW5vX01v/bm8uanBn',
    'Gallo': 'https://imgs.search.brave.com/K_YFyQDAwk-5M9tZEakpqCtiqVO_T7BoO942bPh2je8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jY2wu/dWFubC5teC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMC8w/Nl9ob3Jvc2NvcG9f/Y2hpbm9fR2FsbG8t/NzY4eDY1Ny0xLmpw/Zw',
    'Perro': 'https://imgs.search.brave.com/YmDdejw-o_Eh8PxA0SNqdWBkGbsTf-IposAXE5zbl0E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pY2hl/Zi5iYmNpLmNvLnVr/L2FjZS93cy82NDAv/Y3BzcHJvZHBiLzUy/NEEvcHJvZHVjdGlv/bi9fMTAwMDY2MDEy/X2dldHR5aW1hZ2Vz/LTg5NzE5NjkwMi5q/cGcud2VicA',
    'Cerdo': 'https://imgs.search.brave.com/CVf-muTQ80dl4rFnvDqznIiDEfX8UNg_EKg1iWb2Z0o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb25m/dWNpb21hZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDEvMDZfaG9yb3Nj/b3BvX2NoaW5vX0Nl/cmRvLmpwZw'
  };

  constructor(private fb: FormBuilder) {
    this.datosForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      año: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }

  calcularEdadYSigno() {
    const { dia, mes, año } = this.datosForm.value;

    // Convertir el año a número explícitamente
    const añoNumero = +año;

    // Crea una fecha
    const fechaNacimiento = new Date(añoNumero, mes - 1, dia);

    // Verifica si el año, mes y día coinciden con los valores ingresados
    const esFechaValida = fechaNacimiento.getFullYear() === añoNumero &&
                          fechaNacimiento.getMonth() === mes - 1 &&
                          fechaNacimiento.getDate() === +dia;

    // Si la fecha es inválida, muestra un mensaje de error
    if (!esFechaValida) {
      alert('Fecha de nacimiento no válida');
      return;
    }

    // Si la fecha es válida, continúa con el cálculo de la edad y el signo zodiacal
    this.edad = this.calcularEdad(fechaNacimiento);
    
    // Agregar un mensaje de depuración
    console.log('Año ingresado:', añoNumero);
    
    // Verifica que el año sea correcto
    this.signoZodiacal = this.obtenerSignoZodiacal(añoNumero) as keyof typeof this.imagenesSignos; 
    console.log('Signo zodiacal:', this.signoZodiacal); // Mensaje de depuración

    this.urlImagenSigno = this.imagenesSignos[this.signoZodiacal] || '';

    this.nombreCompleto = `${this.datosForm.value.nombre} ${this.datosForm.value.apellidoPaterno} ${this.datosForm.value.apellidoMaterno}`;
  }

  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  obtenerSignoZodiacal(año: number): string {
    console.log('Año recibido:', año); // Mensaje de depuración
    
    for (const signo of this.signosZodiacales) {
      console.log('Verificando signo:', signo.signo, 'con años:', signo.años); // Mensaje de depuración
      
      if (signo.años.includes(año)) {
        return signo.signo;
      }
    }
    return 'Desconocido';
  }
}
