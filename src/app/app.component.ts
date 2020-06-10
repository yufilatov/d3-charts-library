import { Component, OnInit } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'charts-library';
  types = [];
  activeChart = null;

  pages = ['Home', 'Contacts', 'About'];

  ngOnInit() {
    this.types = routes;
  }

  onClick(index) {
    this.activeChart = index;
  }
}
