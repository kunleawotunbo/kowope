import { NgModule } from '@angular/core';
import { PaymentPage } from './payment';
import { IonicPageModule } from 'ionic-angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
    declarations: [
        PaymentPage
    ],
    imports: [
        IonicPageModule.forChild(PaymentPage),
        RoundProgressModule
    ],
    entryComponents: [
        PaymentPage
    ]
})
export class PaymentPageModule { }