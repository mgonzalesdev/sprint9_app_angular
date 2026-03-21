import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-custom-calendar',
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './custom-calendar.html',
  styleUrl: './custom-calendar.scss',
})

export class CustomCalendar {
  showModal = false;
  newEventTitle = '';
  selectedDateStr = '';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dayHeaderFormat: { weekday: 'narrow' },
    locale: esLocale,
    headerToolbar: {
    right: 'prev,next today',
    center: '',
    left: 'title'
  },
    firstDay: 1,
  height: 'auto',
  contentHeight: 'auto',
  fixedWeekCount: false,
  showNonCurrentDates: true,
    dateClick: (arg) => this.openModal(arg.dateStr),
    events: [{ title: 'Evento Registrado', start: new Date() }]//leer eventos guardados desde la api
  };
  openModal(date: string) {
    this.selectedDateStr = date;
    this.showModal = true;
  }



  saveEvent() { // Acá se debe guardar el evento mediante la api
    if (this.newEventTitle) {
      const newEvent = { title: this.newEventTitle, start: this.selectedDateStr };
      this.calendarOptions.events = [...(this.calendarOptions.events as any[]), newEvent];
      console.log(this.calendarOptions.events);
      this.closeModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.newEventTitle = '';
  }
  //Implementar editar y eliminar eventos
  
}