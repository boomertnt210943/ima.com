import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/service/image.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
  }

  imageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  })

  previewLoaded: boolean = false;

  addImage() {
    this.imageService.addImage(this.imageForm.value).subscribe(data => {
      console.log(data)
      alert('Image added successfully')
      this.imageForm.reset();
    }, err => {
      console.log(err);

    })
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        this.imageForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true
          this.imageForm.patchValue({
            img: reader.result
          })
        }
      }
    }
  }

  resetForm() {
    this.imageForm.reset();
    this.previewLoaded = false;
  }



}
