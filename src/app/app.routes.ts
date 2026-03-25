import { Routes } from '@angular/router';
import { Dashboard } from '@features/dashboard/dashboard';
import { ProductAdminList } from '@features/products/product-admin-list/product-admin-list';
import { ProductForm } from '@features/products/product-form/product-form';
import { ProductDetail } from '@features/products/product-detail/product-detail';
import { Catalog } from '@features/products/catalog/catalog.page';
import { Login } from '@features/auth/login/login';
import { authGuard } from '@core/auth/guards/auth.guard';
import { AuthLayout } from '@core/layouts/auth-layout/auth-layout';
import { Register } from '@features/auth/register/register';
import { MainLayout } from '@core/layouts/main-layout/main-layout';

export const routes: Routes = [
  // DISEÑO DE AUTENTICACIÓN (Sin Navbar/Sidebar)
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },

  {
    path: '',
    component: MainLayout,
    children: [
      // --- RUTAS PÚBLICAS ---
      { path: 'catalog', component: Catalog },
      { path: 'product/:id', component: ProductDetail },
      { path: 'dashboard', component: Dashboard },

      // --- RUTAS PRIVADAS (Protegidas dentro del mismo Layout) ---
      {
        path: 'manage',
        canActivate: [authGuard], // El guard solo protege esta rama
        children: [
          { path: 'list', component: ProductAdminList },
          { path: 'new', component: ProductForm },
          { path: 'edit/:id', component: ProductForm },
        ]
      },

      // Redirección por defecto si la ruta está vacía
      { path: '', redirectTo: 'catalog', pathMatch: 'full' }
    ]
  },


  { path: '**', redirectTo: 'catalog' }
];
