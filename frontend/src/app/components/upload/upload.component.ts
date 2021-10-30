import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../models/images';
import { ImagesService } from 'src/app/service/image.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  image!: Image;
  imageData!: string;


  constructor(private ImageService: ImagesService) { }

  ngOnInit(): void {
  }
  imageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required])
  })

  onFileSelect(event: Event) {
    console.log("onFileSelect");
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.imageForm.patchValue({image: file});
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
    //console.log("submit Image")
    this.ImageService.addImage(this.imageForm.value.name, this.imageForm.value.image,this.imageForm.value.details)
    this.imageForm.reset();
  }




}
