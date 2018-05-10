import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdMobFree } from '@ionic-native/admob-free';
import { CallNumber } from '@ionic-native/call-number';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';



import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { QuickbooksService } from '../providers/quickbooks.service';
import { ConfigService } from '../utility/config.service';
import { UtilityService } from '../utility/utility.service';
import { SampleService } from '../providers/sample.service';
import { NetworkInterceptor } from '../providers/network.interceptor';
import { GpslocationPopoverPage } from '../pages/gpslocation-popover/gpslocation-popover';
import { SharePopoverPage } from '../pages/share-popover/share-popover';

@NgModule({
  declarations: [
    MyApp,
    GpslocationPopoverPage,
    SharePopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GpslocationPopoverPage,
    SharePopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },
    Camera,
    ImagePicker,
    Crop,
    BarcodeScanner,
    Toast,
    AdMobFree,
    CallNumber,
    AndroidPermissions,
    LocalNotifications,
    OneSignal,
    Geolocation,
    SocialSharing,

    AuthService,
    ConfigService,
    Network,
    UtilityService,
    QuickbooksService,
    SampleService,
    
  ]
})
export class AppModule { }
