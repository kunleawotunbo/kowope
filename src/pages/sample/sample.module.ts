import { NgModule } from '@angular/core';
import { SamplePage } from './sample';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SamplePage
    ],
    imports: [
        IonicPageModule.forChild(SamplePage)
    ],
    entryComponents: [
        SamplePage
    ]
})
export class SamplePageModule { }