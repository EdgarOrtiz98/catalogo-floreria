import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { PanelAdmin } from './admin/panel-admin/panel-admin';
import { FormCategory } from './admin/form-category/form-category';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  // Default route
  { path: '', component: Home },
  
  // Route Catalogo
  { path: 'catalogo', component: Catalog },

  // Route Nosotros
  { path: 'nosotros', component: About},

  // Route Contatco
  { path: 'contacto', component: Contact},

  // Route Admin
  { path: 'admin', component: PanelAdmin },
  { path: 'admin/form-category', component: FormCategory },

  // Wildcard route for a 404 page (optional)
  { path: '**', redirectTo: '' }
];
