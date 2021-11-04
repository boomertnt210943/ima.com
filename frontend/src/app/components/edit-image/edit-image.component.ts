import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  public ima: string = '';
  post: any;
  allComment: any;

  imaID = this.ActivatedRoute.snapshot.params.text

  name = new FormControl('', [Validators.required])
  details = new FormControl('', [Validators.required])


  constructor(private ActivatedRoute: ActivatedRoute,
    private imas: ImageService,
    private router: Router,
    public local: LocalStorageService) {
    this.onLoading();
    this.onLoadingComment();
  }

  ngOnInit(): void {

  }

  onLoadingComment(){
    try{
      this.imas.getCommentInImage(this.ActivatedRoute.snapshot.params.text).subscribe(
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

  onLoading() {
    try {
      this.imas.getOneImage(this.imaID).subscribe(
        data => {
          this.post = data;
        }, err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  nameUpdate() {
    this.imas.UpdateimaName(this.imaID, this.name.value).subscribe(
      data => {
        alert('Update name successfully')
        this.onLoading();
        this.name.reset();
      },
      err => {
        console.log(err);
        alert('Cannot update name!');
      }
    );

  }

  detailsUpdate() {
    this.imas.Updateimadetail(this.imaID, this.details.value).subscribe(
      data => {
        alert('Update details successfully')
        this.onLoading();
        this.details.reset();
      },
      err => {
        console.log(err);
        alert('Cannot update details!');
      }
    );

  }

  deleteImg() {
    try {
      this.imas.deleteImg(this.imaID).subscribe(
        data => {
          alert('Delete image successfully')
          this.imas.deleteComment(this.imaID).subscribe(
            err => {
              console.log(err);
            }
          )
          this.imas.deleteLikeWithIma(this.imaID).subscribe(
            err => {
              console.log(err);
            }
          )
          this.router.navigate(['/profile'])
        },
        err => {
          console.log(err);
          alert('Cannot delete image!');
        }
      )

    } catch (error) {
      console.log('It is error')
    }

  }

}
