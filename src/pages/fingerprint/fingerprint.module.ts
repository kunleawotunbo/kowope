import { NgModule } from '@angular/core';
import { FingerprintPage } from './fingerprint';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        FingerprintPage
    ],
    imports: [
        IonicPageModule.forChild(FingerprintPage)
    ],
    entryComponents: [
        FingerprintPage
    ]
})
export class FingerprintPageModule { }