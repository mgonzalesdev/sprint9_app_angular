import { Routes } from '@angular/router';
import { Dashboard } from '@features/dashboard/dashboard';
import { ProductAdminList } from '@features/products/product-admin-list/product-admin-list';
import { ProductForm } from '@features/products/product-form/product-form';
import { ProductDetail } from '@features/products/product-detail/product-detail';
import { Catalog } from '@features/products/catalog/catalog.page';
import { Login } from '@features/auth/login/login';
import { authGuard } from '@core/auth/guards/auth.guard';
import { AdminLayout } from '@core/layouts/admin-layout/admin-layout';
import { PublicLayout } from '@core/layouts/public-layout/public-layout';
import { AuthLayout } from '@core/layouts/auth-layout/auth-layout';
import { Register } from '@features/auth/register/register';

export const routes: Routes = [
  
  // 1. DISEÑO PÚBLICO (Layout con Sidebar - Diseño 1 de Stitch)
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'catalog', component: Catalog },
      { path: 'product/:id', component: ProductDetail },
      { path: '', redirectTo: 'catalog', pathMatch: 'full' }
    ]
  },

  // 2. DISEÑO PRIVADO/ADMIN (Layout Ancho Completo - Diseño 2 de Stitch)
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'manage',
        children: [
          { path: 'list', component: ProductAdminList },
          { path: 'new', component: ProductForm },
          { path: 'edit/:id', component: ProductForm },
        ]
      }
    ]
  },

  // 3. DISEÑO DE AUTENTICACIÓN (Sin Navbar/Sidebar)
  { 
    path: 'auth', 
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
   //   { path: 'register', component: RegisterComponent }, // Aquí irá tu registro
    ]
  },

  // Comodín para rutas no encontradas
  { path: '**', redirectTo: 'catalog' }
];
