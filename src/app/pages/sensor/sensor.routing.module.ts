import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SensorListComponent } from "./sensor-list/sensor-list.component";
import { SensorAddComponent } from "./sensor-add/sensor-add.component";

const routes: Routes = [
    {
        path: '',
        component: SensorListComponent
    },
    {
        path: 'add',
        component: SensorAddComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SensorRoutingModule { }