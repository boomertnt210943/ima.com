import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/service/image.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  image!: any;
  imageData!: string;


  constructor(private ImageService: ImageService,private router: Router,private local:LocalStorageService) {

   }

  ngOnInit(): void {
  }
  imageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
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
    if(!(this.imageForm.value.image === ''||this.imageForm.value.name === ''||this.imageForm.value.details==='')){
      this.ImageService.addImage(this.imageForm.value.name, this.imageForm.value.image,this.imageForm.value.details)
      alert('คุณเพิ่มรูปภาพสำเร็จเเล้ว');
      this.router.navigate(['/home'])
    }else{
      alert('บอกอะไรเกี่ยวกับผลงานหน่อยดิ!!!');
    }

  }




}
