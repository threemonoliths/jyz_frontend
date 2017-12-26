import { Component, ViewChild } from '@angular/core';
import { Bounds, CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

import { UserManagementService } from '../../../services/user_management.service';

@Component({
    selector: 'app-cropper',
    templateUrl: './change_avatar.component.html'
})
export class CropperComponent {
    name: string;
    data1: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(private userService :UserManagementService) {
        this.name = 'ng-alain';
        this.cropperSettings = new CropperSettings();

        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 460;
        this.cropperSettings.canvasHeight = 400;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.rounded = true;

        this.data1 = {};
    }

    cropped(bounds: Bounds) {
        console.log(bounds);
    }

    fileChange($event) {
        const image: any = new Image();
        const file: File = $event.target.files[0];
        // console.log("this is file")
        // console.log(file)
        // this.userService.uploadAvatar(1, file).then(result => console.log(result))
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        
        myReader.readAsDataURL(file);
    }

    uploadAvatar(){
        let v = this.data1.image
        let f = new Blob([v],{type:'text/plain'})
        this.userService.uploadAvatar(localStorage.getItem("currentToken"), f).then(result => console.log(result))
    }
}