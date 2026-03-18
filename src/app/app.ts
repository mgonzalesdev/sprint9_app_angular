import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@core/components/footer/footer';
import { Navbar } from '@core/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'donations-angular';
}
