import { NgModule } from '@angular/core';
import { OthersPage } from './others';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        OthersPage
    ],
    imports: [
        IonicPageModule.forChild(OthersPage)
    ],
    entryComponents: [
        OthersPage
    ]
})
export class OthersPageModule { }