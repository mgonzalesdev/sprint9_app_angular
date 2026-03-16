import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@core/components/footer/footer';
import { Navbar } from '@core/components/navbar/navbar';

@Component({
  selector: 'app-admin-layout',
  imports: [Navbar,RouterOutlet,Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {

}
