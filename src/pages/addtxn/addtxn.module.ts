import { NgModule } from '@angular/core';
import { AddtxnPage } from './addtxn';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        AddtxnPage
    ],
    imports: [
        IonicPageModule.forChild(AddtxnPage)
    ],
    entryComponents: [
        AddtxnPage
    ]
})
export class AddtxnPageModule { }