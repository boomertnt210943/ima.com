import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Image } from 'src/app/models/Image';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

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
  public images!: Image[]
  private imageSubscription!: Subscription;

  //like: boolean = false;

  constructor(
    private imgS: ImageService,
    private router: Router,
    private local: LocalStorageService
    ){
        this.onLoading();
    }


  ngOnInit(): void {
    console.log(this.local.get('user') === null);
    this.imgS.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  ngDoCheck(): void{
    console.log(this.local.get('user') === null);
    if(this.local.get('user') === null){
      this.router.navigate(['/signin']);
    }
  }

  ngOnChanges(): void{
    console.log(this.local.get('user') === null);
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
          console.log('It is error')
          this.router.navigate(['/signin']);
        }
      );
    }catch(error){
      this.router.navigate(['/signin']);
    }
  }
}
