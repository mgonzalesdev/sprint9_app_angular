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

/*export const routes: Routes = [
  
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

export const routes: Routes = [
  
  // 1. RUTAS PÚBLICAS (Se cargan directo en el app.component)
  { path: 'catalog', component: Catalog },
  { path: 'product/:id', component: ProductDetail },

  // 2. RUTAS DE ADMINISTRACIÓN (Protegidas por el Guard)
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'list', component: ProductAdminList },
      { path: 'new', component: ProductForm },
      { path: 'edit/:id', component: ProductForm },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },

  // 3. RUTAS DE AUTENTICACIÓN
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Redirecciones y Comodín
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalog' }
];*/
export const routes: Routes = [
  
  // 1. DISEÑO PÚBLICO (Layout con Sidebar - Diseño 1 de Stitch)
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'catalog', component: Catalog },
      { path: 'product/:id', component: ProductDetail },
      { path: '', redirectTo: 'catalog', pathMatch: 'full' }
    ]
  },

  // 2. DISEÑO PRIVADO/ADMIN (Layout Ancho Completo - Diseño 2 de Stitch)
  {
    path: '',
    component: MainLayout,
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
