import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Image } from "../models/Image";
import { Comment } from "../models/Comment";
import { LikeImage } from "../models/LikeImage";
import { LocalStorageService } from "angular-web-storage";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ImageService {

  private comments: Comment[] = [];
  private comments$ = new Subject<Comment[]>()
  private images: Image[] = [];
  private images$ = new Subject<Image[]>()
  readonly url = "http://localhost:3000/image";
  readonly url_comment = "http://localhost:3000/comment";
  readonly url_like = "http://localhost:3000/like";
  private oneIma?: Image;
  private com?: Comment;
  private likeima?: LikeImage;
  public imageList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  //UserId = this.local.get('user').id;
  constructor(private http: HttpClient, public local: LocalStorageService) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getImages() {
    //const headers={'authorization':token}
    return this.http.get<any>(this.url)
      .pipe(map(data => {
        if (data) {
          this.images = data;
          console.log(this.images);
        }
        return this.images
      }));
  }

  getMyLike(){
    return this.http.get<any>(this.url_like+'/all/'+this.local.get('user').id)
      .pipe(map(data => {
        if (data) {
          this.likeima = data;
          console.log(this.likeima);
        }
        return this.likeima
      }));
  }

  getOneImage(imaid: string){
    return this.http.get<any>(this.url+'/pin/'+imaid)
      .pipe(map(data => {
        if (data) {
          this.oneIma = data;
          console.log(this.oneIma);
        }
        return this.oneIma
      }));
  }

  getCommentInImage(imaid: string){
    return this.http.get<any>(this.url_comment+'/allcom/'+imaid)
      .pipe(map(data => {
        if (data) {
          this.com = data;
          console.log(this.com);
        }
        return this.com
      }));
  }

  getImageStream() {
    return this.images$.asObservable();
    //return this.imageList.asObservable();
  }

  addComment(nickName: string, content: string, ima_comment: string): void {
    this.http
      .post<any>(this.url_comment, {"nick_name": nickName,"content": content,"ima_comment": ima_comment})
      .subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  addLike(ima_like: String) {
    return this.http
      .post<any>(this.url_like, {"owner_id": this.local.get('user').id,"ima_like": ima_like})
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }


  addImage(token:any,name: string, image: File, details: string): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("details", details);
    imageData.append("image", image, name);
    imageData.append("owner_id", this.local.get('user').id);
    this.http
      .post<{ image: Image }>(this.url, imageData)
      .subscribe(imageData => {
        const image: Image = {
          _id: imageData.image._id,
          owner_id: this.local.get('user').id,
          name: name,
          details: details,
          imagePath: imageData.image.imagePath,
        }
        this.images.push(image);
        this.images$.next(this.images);
      })

  }

  UpdateimaName(id: any, newdata: string) {
    let url = `${this.url}/update/${id}`;
    return this.http.put(url,{"name" : newdata })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }
  Updateimadetail(id: any, newdata: string) {
    let url = `${this.url}/update/${id}`;
    return this.http.put(url,{ "details" : newdata })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

  deleteImg(id:any){
    let url = `${this.url}/delete/${id}`;
    return this.http.delete(url,{ headers: this.headers })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

  deleteLike(id:string){
    return this.http.delete(this.url_like+'/delete/'+id,{ headers: this.headers })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

}
