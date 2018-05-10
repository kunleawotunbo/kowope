import { NgModule } from '@angular/core';
import { GpslocationPage } from './gpslocation';
import { IonicPageModule } from 'ionic-angular';
import { GpslocationPopoverPage } from '../gpslocation-popover/gpslocation-popover';

@NgModule({
    declarations: [
        GpslocationPage,
        //GpslocationPopoverPage
    ],
    imports: [
        IonicPageModule.forChild(GpslocationPage)
    ],
    entryComponents: [
        GpslocationPage,
        //GpslocationPopoverPage
    ]
})
export class GpslocationPageModule { }