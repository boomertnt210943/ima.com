import { Component, OnDestroy, OnInit, OnChanges, DoCheck, Input } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Image } from 'src/app/models/Image';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  @Input() images!: Image[];
  //images!: Image[];
  constructor(
    private imgS: ImageService,
    private router: Router,
    private local: LocalStorageService
  ) { }

  ngOnInit(): void {

  }

  //

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
