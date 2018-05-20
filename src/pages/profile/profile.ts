import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AuthService } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { UtilityService } from '../../utility/utility.service';
import { QuickbooksService } from '../../providers/quickbooks.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
// Image picker example
// https://ionicthemes.com/tutorials/about/ionic-2-image-handling
// https://blog.ionicframework.com/10-minutes-with-ionic-2-using-the-camera-with-ionic-native/
export class ProfilePage {
  public base64Image: string;
  photos: Array<string>;
  profilePicture: string;
  username: string;
  pictureTaken: boolean;
  currentUser: any;
  isLoaded: boolean;

  constructor(public navCtrl: NavController, private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public authService: AuthService,
    public events: Events,
    public storage: Storage,
    public utilityService: UtilityService,
    public quickbooksService: QuickbooksService,
    public _DomSanitizer: DomSanitizer,
    private base64: Base64,
  ) {

    //this.username = "Olakunle";
    //this.profilePicture = "assets/images/avatar.png";



  }

  ionViewWillEnter() {
    this.utilityService.presentLoading();
    this.storage.get('currentUser').then((currentUser) => {
      this.currentUser = JSON.parse(currentUser);

      this.profilePicture = this.currentUser.profile_picture;
      this.username = this.currentUser.first_name;

      if (!this.profilePicture) {
        this.profilePicture = "assets/images/avatar.png";
      }

      this.isLoaded = true;
      this.utilityService.loadingDismiss();
    });

  }

  changePassword() {
    console.log("changePassword clicked");
  }

  changeUsername() {
    console.log("changeUsername clicked");
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot('LoginPage');
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openImagePicker() {
    // Set maximum image that can be selected
    let options = {
      maximumImagesCount: 1,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!!');
          this.convertImageToBase64(results);
        });
      }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any): any {
 
    let cropOptions = {
      quality: 75,
      targetHeight: 100,
      targetWidth: 100
    }
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, cropOptions).then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  
  }

  updatePicture() {
    this.pictureTaken = false;
    let options = {
      quality: 100,
      correctOrientation: true
    };

    let cropOptions = {
      quality: 75,
      targetHeight: 75,
      targetWidth: 75
    }

    this.camera.getPicture(options)
      .then((data) => {
        this.photos = new Array<string>();
        this.cropService
          .crop(data, cropOptions)
          .then((newImage) => {
            // this.photos.push(newImage);
            this.profilePicture = newImage;
            // this.profilePicture = this.convertImageToBase64(newImage);
            this.pictureTaken = true;
            // Notify events
            //this.events.publish('picture:updated', this.profilePicture);

          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  takePicture() {
    this.pictureTaken = false;
    let options = {
      quality: 100,
      correctOrientation: true
    };

    let cropOptions = {
      quality: 75,
      targetHeight: 75,
      targetWidth: 75
    }

    this.camera.getPicture(options)
      .then((data) => {
        this.photos = new Array<string>();
        this.cropService
          .crop(data, cropOptions)
          .then((newImage) => {
            // this.photos.push(newImage);
            //this.profilePicture = newImage;

            this.convertImageToBase64(newImage)
            //this.profilePicture = this.convertImageToBase64(newImage);
            // this.pictureTaken = true;
            // Notify events
            //this.events.publish('picture:updated', this.profilePicture);
          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  presentMorePopover(event: Event) {

    var item = 'Just for testing purpose';

    this.utilityService.presentMorePopover(event, item);
  }

  savePicture() {
    this.utilityService.presentLoading();
    if (this.utilityService.isOnline()) {
     // console.log("this.c to send " + this.profilePicture);
      this.updateProfilePicture(this.currentUser.id, this.profilePicture);

    } else {
      this.utilityService.showNoNetworkAlert();
    }
  }

  updateProfilePicture(user_id, profile_picture) {
    var result;
    this.quickbooksService.updateProfilePicture(user_id, profile_picture)
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
          this.storage.set('currentUser', JSON.stringify(result.user));
          // Notify events
          this.events.publish('picture:updated', profile_picture);

          // Remove retake and save picture button after save is successful
          this.pictureTaken = false;
          this.utilityService.loadingDismiss();
          this.utilityService.showNotification(result.message);
        }
      );
  }

  convertImageToBase64(filePath) {

    this.base64.encodeFile(filePath).then((base64File: string) => {
      //console.log("base64File ::" + base64File);
      this.profilePicture = base64File;
      this.pictureTaken = true;
      return base64File;
    }, (err) => {
      console.log(err);
    });
  }
}
