import { NgModule } from '@angular/core';
import { VehiclePage } from './vehicle';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        VehiclePage
    ],
    imports: [
        IonicPageModule.forChild(VehiclePage)
    ],
    entryComponents: [
        VehiclePage
    ]
})
export class VehiclePageModule { }