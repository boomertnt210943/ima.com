import { Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Image } from 'src/app/models/Image';
import { LikeImage } from 'src/app/models/LikeImage';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

import { delay } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, DoCheck{

  public filterCategory : any
  searchKey:string ="";
  public images!: Image[];
  ownerlike!: any;
  private imageSubscription!: Subscription;
  like!: boolean;
  token:any;

  constructor(
    private imgS: ImageService,
    private router: Router,
    private local: LocalStorageService
    ){
        this.onLoading();
        this.onloadingLike();
    }


  ngOnInit(): void {
    console.log(this.local.get('user').result.id)
    this.like = false;
    console.log(this.local.get('user') === null);
    this.imgS.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  ngDoCheck(): void{
    //console.log(this.local.get('user') === null);
    if(this.local.get('user') === null){
      this.router.navigate(['/signin']);
    }
  }

  ngOnChanges(): void{
  }

  onClick(ima: any) {
    //let index = this.postIma.indexOf(ima);
    //this.postIma[index].like = !ima.like;
    //console.log(this.postIma[index].like);
  }

  onLoading(){
    try{
      this.imgS.getImages().subscribe(
        data=>{
          this.images = data;
        }, err =>{
          console.log(err)
          this.router.navigate(['/signin']);
        }
      );
    }catch(error){
      this.router.navigate(['/signin']);
    }
  }

  onloadingLike(){
    try{
      this.imgS.getMyLike().subscribe(
        data=>{
          console.log(data)
          this.ownerlike = data;
        }, err =>{
          console.log(err)
        }
      );
    }catch(error){
      this.router.navigate(['/signin']);
    }
  }

  thisLike(id_ima: string){
    if(this.ownerlike.findIndex((a:any) => a.ima_like === id_ima)===-1){
      return false;
    }else{
      return true;
    }
  }

  ngClassMethod(id_ima: string){
    console.log('it work!')
    if(this.thisLike(id_ima)){
      let index = this.ownerlike.findIndex((a:any) => a.ima_like === id_ima)
      let id = this.ownerlike[index]._id;
      this.imgS.deleteLike(id).subscribe(()=>{this.onloadingLike()});
    }else{
      this.imgS.addLike(id_ima).subscribe(()=>{this.onloadingLike()});
    }
  }
}
