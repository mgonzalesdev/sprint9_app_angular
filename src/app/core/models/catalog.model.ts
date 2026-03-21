export interface Category {
    id: number;
    name: string;
}
export interface Status {
    id: number;
    name: string;
}
export interface Condition {
    id: number;
    name: string;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    publicationDate: Date;
    latitude: string;
    longitude: string;
    image:string;
    category: Category;
    status: Status;
    condition: Condition,
    userId:number
}

//Stats data
export interface CategoryStat {
  label: string; 
  value: string | number; 
}

// Estructura para el grafico de Barras 
export interface TrendStat {
  month: string; // Formato 'YYYY-MM'
  total: string | number;
}

// Estructura para los contadores
export interface SummaryStats {
  totalProducts: number;
  activeProducts: number;
  totalUsers:number
}
