import { Pipe, PipeTransform ,Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // <-- Esto hace que se pueda inyectar en cualquier lugar
})
@Pipe({
  name: 'categoryIcon',
  standalone: true
})
export class CategoryIconPipe implements PipeTransform {

  private iconMap: { [key: string]: string } = {
    'hogar':'house',
    'muebles': 'chair',
    'jardin': 'deceased',
    'libros': 'book',
    'ropa': 'checkroom',
    'electrónica': 'devices',
    'juguetes': 'toys',
    'otros': 'category'
  };

  transform(categoryName: string | undefined): string {
    if (!categoryName) return 'help';
    const name = categoryName.toLowerCase().trim();
    return this.iconMap[name] || 'category'; // Icono por defecto
  }

}
