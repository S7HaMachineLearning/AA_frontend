import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Sensor } from 'src/app/models/sensor-dto';

const HTTP_HEADERS = {
  headers: {
    'content-type': 'application/json',
  }
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // TODO:: move to environment
  private url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

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
    )
  }

}
