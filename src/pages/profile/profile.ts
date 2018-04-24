import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, Events } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AuthService } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';

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
  photos : Array<string>;
  profilePiture: string;
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
    public storage: Storage
  ) {
    this.username = "Olakunle";
    this.profilePiture = "assets/images/avatar.png";
     
  }

  changePassword(){
    console.log("changePassword clicked");
  }

  changeUsername(){
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

  openImagePicker(){
    // Set maximum image that can be selected
    let options = {
      maximumImagesCount: 1,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
    /*
    this.cropService.crop('path/to/image.jpg', {quality: 75})
  .then(
    newImage => console.log('new image path is: ' + newImage),
    error => console.error('Error cropping image', error)
  );
  */

  let cropOptions = {
    quality: 75,
    targetHeight: 100,
     targetWidth: 100
  }
  return selected_pictures.reduce((promise:any, item:any) => {
    return promise.then((result) => {
      return this.cropService.crop(item, cropOptions).then(cropped_image => this.photos.push(cropped_image));
    });
  }, Promise.resolve());

  /*
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());

    */
  }

  updatePicture(){
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
        this.profilePiture = newImage;
        this.pictureTaken = true;
        // Notify events
        this.events.publish('picture:updated', this.profilePiture);

      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

  takePicture(){
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
        this.photos.push(newImage);
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

}
