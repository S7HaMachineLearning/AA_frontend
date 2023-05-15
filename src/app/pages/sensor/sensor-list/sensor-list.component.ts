import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Query } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { Sensor, SensorType } from 'src/app/models/sensor-dto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ]
})
export class SensorListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  sensorList: Sensor[] = [];
  sensorTypes = SensorType;

  ngOnInit() {
    this.loadSensors();
  }

  loadSensors() {
    this.apiService.getSensors()
      .pipe(
        tap((sensors: Sensor[]) => {
          this.sensorList = sensors;
        }),
        catchError(async (err) => {
          console.warn(err);
        })
      ).subscribe();
  }


}
