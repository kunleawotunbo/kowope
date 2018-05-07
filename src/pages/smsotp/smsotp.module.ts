import { NgModule } from '@angular/core';
import { SmsotpPage } from './smsotp';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SmsotpPage
    ],
    imports: [
        IonicPageModule.forChild(SmsotpPage)
    ],
    entryComponents: [
        SmsotpPage
    ]
})
export class SmsotpPageModule { }