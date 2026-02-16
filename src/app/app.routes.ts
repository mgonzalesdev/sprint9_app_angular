import { Routes } from '@angular/router';
import { Catalog } from '@features/public/catalog/catalog';
import { ProductDetail } from '@features/public/product-detail/product-detail';

export const routes: Routes = [
    // { path: '', component: Catalog },
     { path: 'catalog', component: Catalog },
     { path: 'product/:id', component: ProductDetail }, // Ruta dinámica
     { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];
