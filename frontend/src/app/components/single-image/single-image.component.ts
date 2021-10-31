import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css']
})
export class SingleImageComponent implements OnInit {

  public ima : string = '';
  post : any;

  constructor(
    private router: ActivatedRoute,
    private imas: ImageService,
    ) {
      this.onLoading();
    }

  ngOnInit(): void {
    console.log(this.post)
  }

  onLoading(){
    try{
      this.imas.getOneImage(this.router.snapshot.params.text).subscribe(
        data=>{
          this.post = data;
          console.log(this.post)
        }, err =>{
          console.log(err);
        }
      );
    }catch(error){
      console.log(error);
    }
  }
    // this.ima = this.router.snapshot.params.text;
    // console.log(this.ima);
    // try{
    //   this.imas.getOneImage().subscribe(
    //     data=>{
    //       this.post = data;
    //     }, err =>{
    //       console.log(err);
    //     }
    //   );
    // }catch(error){
    //   console.log(error);
    // }
}
