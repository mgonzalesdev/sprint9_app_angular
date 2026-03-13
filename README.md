# 🎁 RegalaApp - API de Intercambio Solidario

**RegalaApp** es una plataforma creada para conectar a personas que quieren dar una segunda vida a sus objetos con quienes los necesitan. El proyecto fomenta la economía circular y el impacto social positivo.

---

## 🚀 Tecnologías Utilizadas

### **Backend (API)**
*   **Framework:** [NestJS](https://nestjs.com) (Node.js)
*   **Base de Datos:**  MySQL (vía **TypeORM**)
*   **Arquitectura:** Modular con Controladores, Servicios y Entidades.

### **Frontend (App)**
*   **Framework:** [Angular 21](https://angular.dev) (Standalone Components)
*   **Estado:** **Angular Signals** (Reactividad de última generación)
*   **Estilos:** **Tailwind CSS** (Diseño responsivo y moderno)
*   **Mapas:** Leaflet (Ubicación aproximada por seguridad)
*   **Gráficos:** Chart.js / Ng2-charts (Dashboard de impacto social)
*   **Calendario:** FullCalendar (Historial de actividad)

---

## 📦 Estructura del Proyecto

### **Architecture**
```text
└───app
    ├───core                # Services, Layout (Navbar), Interfaces
    │   ├───auth
    │   ├───components
    │   │   └───navbar
    │   ├───models
    │   │       catalog.model.ts
    │   └───services
    │           catalog.ts
    │           product.service.ts
    │           stats.ts
    ├───features            # Módulos de lógica de negocio
    │   ├───auth
    │   ├───private         # Dashboard, Gestión de Inventario (CRUD) y Formulario
    │   │   ├───dashboard   
    │   │   ├───product-admin-list
    │   │   └───product-form
    │   └───public         # Catalogo de objetos
    │       ├───catalog
    │       │   └───components
    │       │       └───catalog-map
    │       └───product-detail
    └───shared              # Componentes reutilizables (Maps, ProductCards)
        └───components
            ├───chart
            ├───custom-calendar
            ├───map
            └───product-card
```  

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/mgonzalesdev/Sprint8_Angular.git
cd <directorio_app>  
```
 
### 2. Configurar el Backend (NestJS)
Tener en cuenta que la app consume la api (Nestjs), para ello debe estar debidamente configurada.  

### 3. Configurar el Frontend (Angular)
```bash
cd regala-app
npm install
ng serve
```
La aplicación estará disponible en: [http://localhost:4200](http://localhost:4200)

## ✨ Características Principales
*   **Catálogo:** Visualización en modo galería (cuadrícula) o mapa interactivo donde muestra los objetos disponibles a regalar.
*   **Dashboard de Impacto:** Gráficos en tiempo real sobre productos salvados y tendencias.
*   **Privacidad:** Geolocalización con redondeo de seguridad para proteger la ubicación exacta del donante.
*   **Gestión Total (CRUD):** Panel administrativo para publicar, editar, reservar o dar de baja objetos.
*   **Diseño:** Interfaz limpia construida con Tailwind CSS.

## 🛡️ Seguridad y Privacidad
El sistema implementa un **redondeo de coordenadas** en el frontend antes de enviar los datos al servidor, asegurando que la ubicación guardada tenga un margen de error de aproximadamente 100 metros, protegiendo así la dirección exacta del usuario.


### 📸 Capturas de Pantalla


| ![Catalogo](/public/screenshots/catalog.png) | ![Catalogo Mapa](/public/screenshots/catalog-map.png) |
| :---: | :---: |
| *Vista del listado de objetos* | *Objetos localizados en el mapa* |

| ![Dashboard de Impacto](/public/screenshots/impacto.png) | ![Gestión de mis objetos](/public/screenshots/admin.png) |
| :---: | :---: |
| *Vista del panel de estadísticas* | *Gestión de objetos* |

| ![Registrar Artículo](/public/screenshots/form.png) | 
| :---: | 
| *Formulario de registro* | 