import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//importing Alert controller
import { AlertController } from 'ionic-angular';



//import d camera
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';







@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public photos = new Array<any>();
  public myPic : any;
  public flag : boolean = false;

  constructor(public navCtrl: NavController, private camera : Camera, private mediaCapture: MediaCapture, private alertCtrl: AlertController) {

  }


  
  startCam(): void {
  		/*	 if(this.flag == false){
  			 	this.flag =true;

  			 }
  			  else{
  			  	this.presentConfirm();

  			  } */

  			  //changed destination type: initially
			 //  destinationType: this.camera.DestinationType.FILE_URI 
		     // destinationType: this.camera.DestinationType.DATA_URL (for base64 encoding)


			 const options: CameraOptions = {
					  quality: 100,
					  destinationType: this.camera.DestinationType.FILE_URI,
					  encodingType: this.camera.EncodingType.JPEG,
					  mediaType: this.camera.MediaType.PICTURE,
					  correctOrientation: true,
					  sourceType: this.camera.PictureSourceType.CAMERA,
					  saveToPhotoAlbum: true
					                        }

					this.camera.getPicture(options).then((imageData) => {
					 // imageData is either a base64 encoded string or a file URI
					 // If it's base64 (DATA_URL):
					 //let myPic = 'data:image/jpeg;base64,' + imageData;
					 let myPic = imageData;
					 this.photos.push(myPic);
					 this.photos.reverse();
					 this.startCam();
					 

					}, (err) => {
					 // Handle error
					});


		          }

 takePhoto():void {
 		let options: CaptureImageOptions = { limit: 10 }


        this.mediaCapture.captureImage(options)
        .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err)
         );


             }



    presentConfirm() {
								  let alert = this.alertCtrl.create({
								    title: 'Take more pictures?',
								    message: 'Press yes to take more pictures, no to exit',
								    buttons: [
								      {
								        text: 'No',
								        role: 'cancel',
								        handler: () => {
								          console.log('cancelled');
								        }
								      },
								      {
								        text: 'Yes',
								        handler: () => {
								          console.log('Continue Clicking');
								          alert.dismiss();
								        }
								      }
								    ]
								  });
								  alert.present();
                            }


          deletePhoto(index) {
          		
								  let alert = this.alertCtrl.create({
								    title: 'Confirm Delete?',
								    message: 'This action cannot be reversed.',
								    buttons: [
								      {
								        text: 'Yes',
								        role: 'delete',
								        handler: () => {
								          this.photos.splice(index,1);

								        }
								      },
								      {
								        text: 'No',
								        handler: () => {
								          console.log('Continue Clicking');
								          alert.dismiss();
								        }
								      }
								    ]
								  });
								  alert.present();
          }
                     




}
