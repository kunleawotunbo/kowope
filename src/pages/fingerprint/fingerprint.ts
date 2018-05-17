import { Component } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';

@IonicPage()
@Component({
  selector: 'page-fingerprint',
  templateUrl: 'fingerprint.html'
})
export class FingerprintPage {

  fingerprintOptions: FingerprintOptions;

  constructor(private platform: Platform,
    private fingerprint: FingerprintAIO
  ) {
    this.fingerprintOptions = {
      clientId: 'fingerprint-demo',
      clientSecret: 'password',
      disableBackup: true
    }
  }

  async showFingerprintDailog() {
    try {

      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      console.log("available :: " + available);
      alert("available :: " + available);
      if (available === "OK") {
        const result = await this.fingerprint.show(this.fingerprintOptions);
        console.log(result);
        alert("result :: " + result);
      } else {
        console.log("available is not ok :: " + available);
        alert("available is not ok :: " + available);
      }


      /*
      this.platform.ready().then(() => {

        const available = this.fingerprint.isAvailable().then(() => {
          console.log("available :: " +  available);
          alert("available :: " + available);
      if (available === "OK") {
        const result = this.fingerprint.show(this.fingerprintOptions);
        console.log(result);
        alert("result :: " + result);
      }
        });
      

      });
      */
    } catch (e) {
      alert("catch error :: " + e);
      console.error(e);
    }
  }


  test() {
    this.fingerprint.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
      .then((result: any) => console.log(result))
      .catch((error: any) => console.log(error));
  }

}
