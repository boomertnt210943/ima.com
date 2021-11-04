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

  ownerlike!: any;
  //images!: Image[];
  constructor(
    private imgS: ImageService,
    private router: Router,
    private local: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.onloadingLike();
    console.log('work!');
  }

  //

  onloadingLike(){
    try{
      this.imgS.getMyLikeWihtIma().subscribe(
        data=>{
          console.log('this ' + data)
          this.ownerlike = data;
        }, err =>{
          console.log(err)
        }
      );
    }catch(error){
      console.log(error)
    }
  }

  onClickDeleteLike(id_ima: string){
      console.log('it work!')
      this.imgS.deleteLike(id_ima).subscribe(()=>{this.onloadingLike()});
  }
}
