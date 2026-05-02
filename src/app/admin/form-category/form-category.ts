import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Floreria } from '../../core/services/floreria';
import { NavbarAdmin } from '../../component/navbar-admin/navbar-admin';

@Component({
  selector: 'app-form-category',
  imports: [ReactiveFormsModule, CommonModule, NavbarAdmin],
  templateUrl: './form-category.html',
  styleUrl: './form-category.css',
})
export class FormCategory implements OnInit {
  @Output() onCategoryAdded = new EventEmitter<void>();

  categoriaForm: FormGroup;
  categorias: any[] = [];
  cargando = false;

  constructor(private fb: FormBuilder, private floreria: Floreria) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['']
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  async cargarCategorias() {
    this.categorias = await this.floreria.getCategorias();
  }

  async onSaveCategoria() {
    if (this.categoriaForm.valid) {
      this.cargando = true;
      try {
        await this.floreria.crearCategoria(this.categoriaForm.value);
        this.categoriaForm.reset();
        await this.cargarCategorias();
        this.onCategoryAdded.emit(); // Notificar al padre
      } catch (e) {
        alert('Error al guardar categoría');
      } finally {
        this.cargando = false;
      }
    }
  }
}

