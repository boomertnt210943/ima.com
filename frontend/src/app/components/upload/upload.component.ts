import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../models/images';
import { ImageService } from 'src/app/service/image.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form!: FormGroup;
  image!: Image;
  imageData!: string;



  constructor(private ImageService: ImageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null)
    });

  }

  onFileSelect(event: Event) {
    console.log("onFileSelect");
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const allowedMimeFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }

  }

  onSubmit() {
    console.log("submit Image")
    this.form.reset();
    this.imageData = "";
  }




}
