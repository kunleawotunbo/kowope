import { NgModule } from '@angular/core';
import { JournalsPage } from './journals';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        JournalsPage
    ],
    imports: [
        IonicPageModule.forChild(JournalsPage)
    ],
    entryComponents: [
        JournalsPage
    ]
})
export class JournalsPageModule { }