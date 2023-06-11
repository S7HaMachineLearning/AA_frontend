import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { Sensor, SensorType } from 'src/app/models/sensor-dto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
export class SensorListComponent {

  constructor(
    private apiService: ApiService,
    private route: Router,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  sensorList: Sensor[] = [];
  sensorTypes = SensorType;

  ionViewWillEnter(){   
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

  addSensor() {
    this.route.navigateByUrl('/sensor/add');
  }

  async deleteClick(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete Sensor?',
      message: `Are you sure you want to delete '${item.friendlyName}'?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: async () => {
            this.apiService.deleteSensor(item.id)
              .subscribe({
                next: () => {
                  this.presentToast('Sensor deleted successfully');
                  this.loadSensors();
                },
                error: (err) => {
                  this.presentToast('Sensor deleted unsuccessful', 'danger');
                }
              });
          },
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });

    await toast.present();
  }
}
