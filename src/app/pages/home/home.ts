import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../component/product-card/product-card';
import { Floreria } from '../../core/services/floreria';

@Component({
  selector: 'app-home',
  imports: [ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredProducts: any[] = [];

  constructor(
    private floreriaService: Floreria,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDestacados();
  }

  async cargarDestacados() {
    try {
      // Traemos solo 4 productos para la página de inicio
      const { data, error } = await this.floreriaService.supabase
        .from('Flores')
        .select(`
          id_flores,
          nombre,
          precio,
          imagen_url,
          descuento,
          Categoria_flores ( nombre )
        `)
        .limit(4); // Limitamos a 4 para no saturar el inicio

      if (error) throw error;

      if (data) {
        this.featuredProducts = data.map((item: any) => {
          let precioFinal = item.precio;
          let precioOriginal = null;

          if (item.descuento && item.descuento > 0) {
            precioOriginal = item.precio;
            precioFinal = item.precio - (item.precio * (item.descuento / 100));
          }

          return {
            name: item.nombre,
            price: precioFinal,
            oldPrice: precioOriginal,
            imageUrl: item.imagen_url,
            category: item.Categoria_flores?.nombre || 'General',
            discount: item.descuento ? `${item.descuento}% OFF` : null 
          };
        });
        
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error al cargar destacados:', error);
    }
  }
}