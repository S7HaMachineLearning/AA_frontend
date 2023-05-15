import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SensorModule } from './pages/sensor/sensor.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    SensorModule
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'mail' },
    { title: 'Sensors', url: '/sensor', icon: 'paper-plane' },
  ];

  constructor() { }
}
