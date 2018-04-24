import { NgModule } from '@angular/core';
import { TxndetailsPage } from './txn-details';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        TxndetailsPage
    ],
    imports: [
        IonicPageModule.forChild(TxndetailsPage)
    ],
    entryComponents: [
        TxndetailsPage
    ]
})
export class TxndetailsPageModule { }