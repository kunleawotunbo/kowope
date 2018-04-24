import { NgModule } from '@angular/core';
import { NotificationPage } from './notification';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        NotificationPage
    ],
    imports: [
        IonicPageModule.forChild(NotificationPage)
    ],
    entryComponents: [
        NotificationPage
    ]
})
export class NotificationPageModule { }