import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges{

  @Input() CheckComment!: number;
  commentInImage: any;

  constructor(
    private imas: ImageService,
    private router: ActivatedRoute
    ) {
    this.onLoading();
  }


  ngOnInit(): void {
  }

  ngOnChanges(){
    this.onLoading();
  }

  onLoading(){
    try{
      this.imas.getCommentInImage(this.router.snapshot.params.text).subscribe(
        data=>{
          this.commentInImage = data;
          console.log(this.commentInImage)
        }, err =>{
          console.log(err);
        }
      );
    }catch(error){
      console.log(error);
    }
  }

}
