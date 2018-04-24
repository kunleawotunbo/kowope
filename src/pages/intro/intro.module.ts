import { NgModule } from '@angular/core';
import { IntroPage } from './intro';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        IntroPage
    ],
    imports: [
        IonicPageModule.forChild(IntroPage)
    ],
    entryComponents: [
        IntroPage
    ]
})
export class IntroPageModule { }