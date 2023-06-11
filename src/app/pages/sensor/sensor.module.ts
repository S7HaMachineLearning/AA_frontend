import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SensorRoutingModule } from "./sensor.routing.module";
import { IonicModule } from "@ionic/angular";
import { SensorAddComponent } from "./sensor-add/sensor-add.component";
import { SensorListComponent } from "./sensor-list/sensor-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        SensorAddComponent,
        SensorListComponent
    ],
    imports: [
        CommonModule,
        SensorRoutingModule,
        CommonModule,
        IonicModule,
    ],
})
export class SensorModule { }