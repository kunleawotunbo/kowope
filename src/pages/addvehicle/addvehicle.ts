import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { QuickbooksService } from '../../providers/quickbooks.service';
import { UtilityService } from '../../utility/utility.service';

@IonicPage()
@Component({
  selector: 'page-addvehicle',
  templateUrl: 'addvehicle.html'
})
export class AddvehiclePage {
  txnsList: any; driverList;
  private form: FormGroup;
  public modelNo: AbstractControl; plateNo; color; datePurchased; driverId;


  constructor(public navCtrl: NavController, public quickbooksService: QuickbooksService,
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    public utilityService: UtilityService

  ) {
    //this.presentLoading();
    this.form = this.formBuilder.group({
      modelNo: ['', Validators.required],
      plateNo: ['', Validators.required],
      color: ['', Validators.required],
      datePurchased: ['', Validators.required],
      driverId: ['', Validators.required]
    });

    this.modelNo = this.form.controls['modelNo'];
    this.plateNo = this.form.controls['plateNo'];
    this.color = this.form.controls['color'];
    this.datePurchased = this.form.controls['datePurchased'];
    this.driverId = this.form.controls['driverId'];
  }

  ionViewDidLoad() {
    this.getDriversList()
  }

  itemSelected(item) {

  }

  goBack() {
    //this.navCtrl.push('FleetmgtPage');
    this.navCtrl.pop();
  }

  getDriversList() {
    this.driverList = [
      { id: 1, name: 'Stanley' },
      { id: 2, name: 'School Boy' },
      { id: 3, name: 'Feranmi' }
    ];
  }

  submitForm() {

    if (this.utilityService.isOnline()) {
      this.createVehicle(this.modelNo.value, this.plateNo.value,
        this.color.value,
        this.datePurchased.value, this.driverId.value
      )
      this.form.reset();
    } else {
      this.utilityService.showNoNetworkAlert();
    }


  }

  createVehicle(modelNo, plateNo, color, datePurchased, driverId) {
    this.utilityService.presentLoading();

    var result;
    this.quickbooksService.createVehicle(modelNo, plateNo, color, datePurchased, driverId)
      .map((response: Response) => response).subscribe(
      data => {
        result = data;
      },
      error => {
        console.log(error);
        this.utilityService.loadingDismiss();
      },
      () => {
        //console.log("result :: "  + result);
        // this.loader.dismiss();
        this.utilityService.loadingDismiss();
        this.utilityService.showNotification("Vehicle created successfully");
      }
      );
  }

}
