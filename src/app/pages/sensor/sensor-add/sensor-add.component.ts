import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { HaSensor } from 'src/app/models/ha-sensor-dta';
import { Sensor, SensorType, newSensor } from 'src/app/models/sensor-dto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sensor-add',
  templateUrl: './sensor-add.component.html',
  styleUrls: ['./sensor-add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,

  ]
})
export class SensorAddComponent implements OnInit {

  haSensors: HaSensor[] = [];
  public results = [...this.haSensors];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: Router
  ) { }

  ngOnInit() {
    this.loadHaSensors();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.haSensors.filter((d) => d.entityId.toLowerCase().indexOf(query) > -1);
  }

  loadHaSensors() {
    this.apiService.getHaSensor()
      .pipe(
        tap((sensors: HaSensor[]) => {
          this.results = sensors;
          this.haSensors = sensors;
        }),
        catchError(async (err) => {
          console.warn(err);
        })
      ).subscribe();
  }

  saveToDb(haSensor: HaSensor, type: SensorType) {
    const sensor: newSensor = {
      haSensorId: haSensor.entityId,
      friendlyName: haSensor.friendlyName,
      type
    };
    this.apiService.saveSensor(sensor)
      .pipe(
        tap((x: any) => {
          if (x != 0) {
            this.presentToast();
            this.route.navigateByUrl('/sensor');
          }
        }),
        catchError(async (err) => {
          console.warn(err);
        })
      ).subscribe();
  }

  async clickSensor(sensor: HaSensor) {
    const alert = await this.alertController.create({
      header: 'Select Sensor Type',
      subHeader: sensor.friendlyName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            if (data == undefined)
              return;
            this.saveToDb(sensor, data);
          },
        },
      ],
      inputs: [
        {
          label: 'Humidity',
          type: 'radio',
          value: SensorType.HUMIDITY
        },
        {
          label: 'Temperature',
          type: 'radio',
          value: SensorType.TEMPERATURE
        },
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sensor added!',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

}
