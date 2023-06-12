import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { Automation, FeedbackType } from 'src/app/models/automation-dto';
import { ApiService } from 'src/app/services/api/api.service';
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AutomationListComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private route: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private clipboard: Clipboard
  ) { }

  automationList: Automation[] = [];

  ngOnInit() {
    this.loadAutomations();
  }

  loadAutomations() {
    this.apiService.getAutomation()
      .pipe(
        tap((automation: Automation[]) => {
          this.automationList = automation;
        }),
        catchError(async (err) => {
          console.warn(err);
        })
      ).subscribe();
  }

  copyToClipboard(automation: Automation) {
      this.clipboard.copy(automation.value);
  }

  async updateStatus(automation: Automation) {

    const alert = await this.alertController.create({
      header: 'Please grade the automation',
      subHeader: automation.id.toString(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Good',
          role: 'confirm',
          cssClass: 'alert-button-accepted',
          handler: (data) => {
            this.saveToDb(automation, FeedbackType.ACCEPTED);
          },
        },
        {
          text: 'Good, but don\'t use',
          role: 'confirm',
          cssClass: 'alert-button-good',
          handler: (data) => {
            this.saveToDb(automation, FeedbackType.DECLINED_GOOD);
          },
        },
        {
          text: 'Bad, don\'t use',
          role: 'confirm',
          cssClass: 'alert-button-bad',
          handler: (data) => {
            this.saveToDb(automation, FeedbackType.DECLINED_BAD);
          },
        },
      ]
    });
    await alert.present();
  }
  saveToDb(automation: Automation, status: FeedbackType) {
    this.apiService.updateAutomation(automation, status).pipe(
      tap(() => {
        this.loadAutomations();
      }),
      catchError(async (err) => {
        console.warn(err);
      })
    ).subscribe();
  }



  getStatusName(status: number) {
    switch (status) {
      case 0: {
        return 'New';
      }
      case 1: {
        return 'Accepted';
      }
      case 2: {
        return 'Declined - Good';
      }
      case 3: {
        return 'Declined - Bad';
      }
      default: {
        return 'Unknown';
      }
    }
  }

}
