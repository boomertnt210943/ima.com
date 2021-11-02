import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { ImageService } from 'src/app/service/image.service';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.css']
})
export class MyImagesComponent implements OnInit {

  @Input() images!: Image[];
  //images!: Image[]
  constructor(
    private imgS: ImageService,
    private router: Router,
    private local: LocalStorageService
    ){
        //this.onLoading();
    }

  ngOnInit(): void {
  }


  onLoading(){
    try{
      this.imgS.getImages().subscribe(
        data=>{
          console.log('data',data)
          this.images = data;
        }, err =>{
          console.log('It is error')
        }
      );
    }catch(error){
      console.log('It is error')
    }
  }

}
