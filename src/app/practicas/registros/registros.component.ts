import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: number;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasXPagar: number;
  horasExtras: number;
  subTotal: number;
}

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
  standalone: true, 
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export default class RegistrosComponent implements OnInit {
  registroForm: FormGroup;
  empleados: Empleado[] = [];
  selectedEmpleado: Empleado | null = null;
  matriculaBuscar: number = 0; // Inicializar la propiedad para evitar el error

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]]
    });

    this.cargarEmpleados();
  }

  ngOnInit() {
    // Método ngOnInit implementado
  }

  registrarEmpleado() {
    const empleado = this.registroForm.value; // Obtiene los valores del formulario
    const empleados = JSON.parse(localStorage.getItem('empleados') || '[]'); // Obtiene los empleados del local storage
    const index = empleados.findIndex((e: Empleado) => e.matricula === empleado.matricula); // Busca si ya existe un empleado con la misma matrícula

    if (index !== -1) {
        // Si existe, reemplaza el empleado existente
        empleados[index] = empleado;
    } else {
        // Si no existe, agrega el nuevo empleado
        empleados.push(empleado);
    }

    localStorage.setItem('empleados', JSON.stringify(empleados)); // Guarda de nuevo en el local storage
    this.registroForm.reset(); // Opcional: reinicia el formulario
    this.cargarEmpleados(); // Carga nuevamente los empleados para actualizar el array
  }

  calcularSalario (empleado: Empleado) {
    const horasXPagar = Math.min(empleado.horasTrabajadas, 40) * 70; // Calcular solo las horas hasta 40
    const horasExtras = empleado.horasTrabajadas > 40 ? empleado.horasTrabajadas - 40 : 0;
    const totalHorasExtras = horasExtras * 140; // Cambiado para calcular el total por horas extra
    const subTotal = horasXPagar + totalHorasExtras; // Usar totalHorasExtras en el subtotal
    empleado.horasXPagar = horasXPagar; // Almacenar horas por pagar
    empleado.horasExtras = totalHorasExtras; // Almacenar el total en lugar de la cantidad
    empleado.subTotal = subTotal;
    return subTotal;
  }

  imprimirEmpleados() {
    this.empleados.forEach((empleado) => {
      this.calcularSalario(empleado);
      console.log(empleado); // Agrega esta línea para imprimir los datos del empleado
    });
  }

  buscarEmpleado(matricula: number) {
    return this.empleados.find((empleado) => empleado.matricula === matricula);
  }

  modificarEmpleado() {
    if (this.selectedEmpleado) {
      const index = this.empleados.indexOf(this.selectedEmpleado);
      if (index !== -1) {
        this.empleados[index] = {
          ...this.selectedEmpleado,
          ...this.registroForm.value,
        };
        this.guardarEmpleados();
      }
    }
  }

  eliminarEmpleado(matricula: number) {
    const index = this.empleados.findIndex((empleado) => empleado.matricula === matricula);
    if (index !== -1) {
      this.empleados.splice(index, 1);
      this.guardarEmpleados();
    }
  }

  cargarEmpleados() {
    const empleadosStorage = localStorage.getItem('empleados');
    if (empleadosStorage) {
      this.empleados = JSON.parse(empleadosStorage);
    }
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  calcularTotalAPagar() {
    return this.empleados.reduce((total, empleado) => total + empleado.subTotal, 0);
  }

  // Método para buscar y cargar los datos del empleado en el formulario
  buscarYModificarEmpleado() {
    const empleado = this.buscarEmpleado(this.matriculaBuscar);
    if (empleado) {
      this.selectedEmpleado = empleado; // Establecer el empleado seleccionado
      this.registroForm.patchValue(empleado); // Cargar los datos en el formulario
    } else {
      alert('Empleado no encontrado'); // Mensaje si no se encuentra el empleado
    }
  }
}
