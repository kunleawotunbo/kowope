import { NgModule } from '@angular/core';
import { TermsPage } from './terms';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        TermsPage
    ],
    imports: [
        IonicPageModule.forChild(TermsPage)
    ],
    entryComponents: [
        TermsPage
    ]
})
export class TermsPageModule { }