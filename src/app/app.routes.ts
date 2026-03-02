import { Routes } from '@angular/router';
import { Dashboard } from '@features/private/dashboard/dashboard';
import { ProductAdminList } from '@features/private/product-admin-list/product-admin-list';
import { ProductForm } from '@features/private/product-form/product-form';
import { Catalog } from '@features/public/catalog/catalog';
import { ProductDetail } from '@features/public/product-detail/product-detail';

export const routes: Routes = [
    // { path: '', component: Catalog },
    { path: 'catalog', component: Catalog },
    { path: 'product/:id', component: ProductDetail }, // Ruta dinámica
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'manage/new', component: ProductForm },
    { path: 'manage/edit/:id', component: ProductForm },
    { path: 'manage/list', component: ProductAdminList},
     { path: 'dashboard', component: Dashboard },
];
