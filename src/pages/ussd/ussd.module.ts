import { NgModule } from '@angular/core';
import { UssdPage } from './ussd';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        UssdPage
    ],
    imports: [
        IonicPageModule.forChild(UssdPage)
    ],
    entryComponents: [
        UssdPage
    ]
})
export class UssdPageModule { }