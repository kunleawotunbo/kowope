import { NgModule } from '@angular/core';
import { AddvehiclePage } from './addvehicle';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        AddvehiclePage
    ],
    imports: [
        IonicPageModule.forChild(AddvehiclePage)
    ],
    entryComponents: [
        AddvehiclePage
    ]
})
export class AddvehiclePageModule { }