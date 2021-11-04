import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css']
})
export class SingleImageComponent implements OnInit {

  commentForm = new FormGroup({
    nick_name : new FormControl('',[Validators.required]),
    content : new FormControl('',[Validators.required]),
  });

  public ima : string = '';
  post : any;
  eventCheck! : number;
  allComment :any;

  constructor(
    private router: ActivatedRoute,
    private imas: ImageService,
    ) {
      this.onLoading();
      this.onLoadingComment();
    }

  ngOnInit(): void {
    this.eventCheck = 0;
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

  onLoadingComment(){
    try{
      this.imas.getCommentInImage(this.router.snapshot.params.text).subscribe(
        data=>{
          this.allComment = data;
          console.log(this.allComment)
        }, err =>{
          console.log(err);
        }
      );
    }catch(error){
      console.log(error);
    }
  }

  PostComment(){
      const status = this.commentForm.status;
      if(status == "VALID"){
        this.imas.addComment(this.commentForm.value.nick_name,this.commentForm.value.content,this.post[0]._id).subscribe(
        );
        this.commentForm.reset();
        this.eventCheck++;
        alert('คุณได้ comment เรียบร้อยแล้ว');
        this.onLoadingComment();
      }else{
        alert('ฮั่นแน่! ทำไมไม่กรอกข้อมูลให้ครบ');
      }
    }
}
