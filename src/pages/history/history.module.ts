import { NgModule } from '@angular/core';
import { HistoryPage } from './history';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        HistoryPage
    ],
    imports: [
        IonicPageModule.forChild(HistoryPage)
    ],
    entryComponents: [
        HistoryPage
    ]
})
export class HistoryPageModule { }