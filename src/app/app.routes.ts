import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {
    path: 'sensor',
    loadChildren: () => import('./pages/sensor/sensor.module').then(m => m.SensorModule),
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
