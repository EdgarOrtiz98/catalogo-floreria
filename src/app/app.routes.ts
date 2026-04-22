import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  // Default route
  { path: '', component: Home },
  
  // Route Catalogo
  { path: 'catalogo', component: Catalog },

  // Wildcard route for a 404 page (optional)
  { path: '**', redirectTo: '' }
];
