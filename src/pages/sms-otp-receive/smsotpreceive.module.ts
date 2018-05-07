import { NgModule } from '@angular/core';
import { SmsOtpReceivePage } from './smsotpreceive';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SmsOtpReceivePage
    ],
    imports: [
        IonicPageModule.forChild(SmsOtpReceivePage)
    ],
    entryComponents: [
        SmsOtpReceivePage
    ]
})
export class SmsOtpReceivePageModule { }