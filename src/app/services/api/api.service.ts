import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Sensor, newSensor } from 'src/app/models/sensor-dto';
import { HaSensor } from 'src/app/models/ha-sensor-dto';
import { Automation, FeedbackType } from 'src/app/models/automation-dto';

const HTTP_HEADERS = {
  headers: {
    'content-type': 'application/json'
  }
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // TODO:: move to environment
  private url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  /**
   * Get list of configured sensors
   * @returns List of sensors
   */
  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(
      `${this.url}/sensors`,
      HTTP_HEADERS
    ).pipe(
      map((x: any) => {
        const sensorCount = Object.keys(x).length;
        let sensorList = [];
        for (let index = 0; index < sensorCount; index++) {
          const sensor = x[index];
          sensorList.push(sensor)
        }
        return sensorList;
      })
    );
  }

  saveSensor(sensor: newSensor): Observable<void> {
    return this.http.post<void>(
      `${this.url}/sensors`,
      sensor,
      HTTP_HEADERS
    ).pipe(
      catchError(async (err) => {
        console.warn('saveSensor', err);
      })
    );
  }

  deleteSensor(id: any): Observable<void> {
    console.log('deleteSensor', id);
    return this.http.delete<void>(
      `${this.url}/sensors/${id}`,
      HTTP_HEADERS
    ).pipe(
      catchError(async (err) => {
        console.warn('deleteSensor', err);
      })
    );
  }

  /**
   * Get Home assistant sensor data
   * @returns List of HA sensors
   */
  getHaSensor(): Observable<HaSensor[]> {
    return this.http.get<HaSensor[]>(
      `${this.url}/sensors/ha`,
      HTTP_HEADERS
    ).pipe(
      map((x: any) => {
        const sensorCount = Object.keys(x).length;
        let sensorList = [];
        for (let index = 0; index < sensorCount; index++) {
          const sensor = x[index];
          sensorList.push(sensor)
        }
        return sensorList;
      }
      )
    );
  }

  getAutomation(): Observable<Automation[]> {
    return this.http.get<Automation[]>(
      `${this.url}/automations`,
      HTTP_HEADERS
    ).pipe(
      map((x: any) => {
        const automationCount = Object.keys(x).length;
        let automationList = [];
        for (let index = 0; index < automationCount; index++) {
          const sensor = x[index];
          automationList.push(sensor)
        }
        return automationList;
      })
    );
  }

  updateAutomation(automation: Automation, status: FeedbackType): Observable<void> {
    return this.http.patch<void>(
      `${this.url}/automations/${automation.id}`,
      {
        status: status
      },
      HTTP_HEADERS
    ).pipe(
      catchError(async (err) => {
        console.warn('saveAutomation', err);
      })
    );
  }
}
