import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(status: string | undefined): string {
    const s = status?.toLowerCase();

    if (s === 'disponible') {
      return 'bg-emerald-500 text-emerald-700 bg-primary border-emerald-200 hover:bg-primary-600';
    }
    if (s === 'reservado') {
      return 'bg-amber-500 text-amber-700 border-amber-200 hover:bg-amber-200';
    }
    if (s === 'entregado') {
      return 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300';
    }

    return 'bg-gray-100 text-gray-600 border-gray-200';
  }

}
