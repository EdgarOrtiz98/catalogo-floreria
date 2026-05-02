import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Floreria } from '../../core/services/floreria';
import { CommonModule } from '@angular/common';
import { NavbarAdmin } from '../../component/navbar-admin/navbar-admin';

@Component({
  selector: 'app-panel-admin',
  imports: [ReactiveFormsModule, CommonModule, NavbarAdmin],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})

export class PanelAdmin implements OnInit {
  florForm: FormGroup;
  categorias: any[] = [];
  flores: any[] = [];
  archivoSeleccionado: File | null = null;
  cargando = false;

  constructor(private fb: FormBuilder, private floreria: Floreria) {
    // Formulario de Flores
    this.florForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(1)]],
      id_categoria: ['', Validators.required],
      status: ['Activo'],
      descuento: [0]
    });
  }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarFlores();
  }

  async cargarCategorias() {
    this.categorias = await this.floreria.getCategorias();
  }

  async cargarFlores() {
    this.flores = await this.floreria.getFlores();
  }

  // Manejar archivo de imagen
  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  // Guardar Flor (Proceso completo)
  async onSaveFlor() {
    if (this.florForm.valid && this.archivoSeleccionado) {
      this.cargando = true;
      try {
        await this.floreria.agregarFlor(this.florForm.value, this.archivoSeleccionado);
        alert('Flor registrada con éxito');
        this.florForm.reset({ status: 'Activo', descuento: 0 });
        this.archivoSeleccionado = null;
        await this.cargarFlores(); // Refresh flowers table
      } catch (e) {
        alert('Error al guardar');
      } finally {
        this.cargando = false;
      }
    }
  }
}
