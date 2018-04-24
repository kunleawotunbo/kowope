import { NgModule } from '@angular/core';
import { ForgotPasswordPage } from './forgotpassword';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ForgotPasswordPage
    ],
    imports: [
        IonicPageModule.forChild(ForgotPasswordPage)
    ],
    entryComponents: [
        ForgotPasswordPage
    ]
})
export class ForgotPasswordPageModule { }