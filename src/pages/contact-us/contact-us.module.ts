import { NgModule } from '@angular/core';
import { ContactUsPage } from './contact-us';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ContactUsPage
    ],
    imports: [
        IonicPageModule.forChild(ContactUsPage)
    ],
    entryComponents: [
        ContactUsPage
    ]
})
export class ContactUsPageModule { }