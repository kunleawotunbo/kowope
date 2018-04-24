import { NgModule } from '@angular/core';
import { FleetmgtPage } from './fleetmgt';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        FleetmgtPage
    ],
    imports: [
        IonicPageModule.forChild(FleetmgtPage)
    ],
    entryComponents: [
        FleetmgtPage
    ]
})
export class FleetmgtPageModule { }