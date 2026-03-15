import { Routes } from '@angular/router';
import { Dashboard } from '@features/dashboard/dashboard';
import { ProductAdminList } from '@features/products/product-admin-list/product-admin-list';
import { ProductForm } from '@features/products/product-form/product-form';
import { ProductDetail } from '@features/products/product-detail/product-detail';
import { Catalog } from '@features/products/catalog/catalog.page';
import { Login } from '@core/auth/login/login';
import { authGuard } from '@core/auth/guards/auth.guard';

export const routes: Routes = [
    /* // { path: '', component: Catalog },
     { path: 'catalog', component: Catalog},
     { path: 'product/:id', component: ProductDetail }, // Ruta dinámica
     { path: '', redirectTo: 'catalog', pathMatch: 'full' },
     { path: 'manage/new', component: ProductForm },
     { path: 'manage/edit/:id', component: ProductForm },
     { path: 'manage/list', component: ProductAdminList},
      { path: 'dashboard', component: Dashboard },
      {  path: 'auth',
   children: [
     { path: 'login', component: Login },
     // { path: 'register', component: RegisterComponent }
   ]}
 */
    // Rutas Públicas
    { path: 'catalog', component: Catalog },
    { path: 'product/:id', component: ProductDetail },
    { path: 'auth/login', component: Login },

    // Rutas Protegidas (Solo con Login)
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'manage',
        canActivate: [authGuard],
        children: [
            { path: 'list', component: ProductAdminList },
            { path: 'new', component: ProductForm },
            { path: 'edit/:id', component: ProductForm },
        ]
    },

    { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];
