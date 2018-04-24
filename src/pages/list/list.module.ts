import { NgModule } from '@angular/core';
import { ListPage} from './list';
import { IonicPageModule } from 'ionic-angular';
import { SampleService } from '../../providers/sample.service';

@NgModule({
  declarations: [ListPage],
  imports: [IonicPageModule.forChild(ListPage)],
  entryComponents: [ListPage],
  providers: [
    SampleService
  ]
})
export class ListPageModule { }