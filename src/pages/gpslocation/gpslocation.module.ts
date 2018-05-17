import { NgModule } from '@angular/core';
import { GpslocationPage } from './gpslocation';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        GpslocationPage
    ],
    imports: [
        IonicPageModule.forChild(GpslocationPage)
    ],
    entryComponents: [
        GpslocationPage
    ]
})
export class GpslocationPageModule { }