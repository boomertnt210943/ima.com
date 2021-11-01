import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Image } from "../models/Image";
import { Comment } from "../models/Comment";
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
  private oneIma?: Image;
  private com?: Comment;
  public imageList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  //UserId = this.local.get('user').id;
  constructor(private http: HttpClient, public local: LocalStorageService) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getImages() {
    // this.http
    // .get<{ images: Image[] }>(this.url)
    // .pipe(
    //   map((imageData) => {
    //     return imageData.images;
    //   })
    // )
    // .subscribe((images) => {
    //   this.images = images;
    //   this.images$.next(this.images);
    // });
    return this.http.get<any>(this.url)
      .pipe(map(data => {
        if (data) {
          this.images = data;
          console.log(this.images);
        }
        return this.images
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


  addImage(name: string, image: File, details: string): void {
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
    let url_ima = `${this.url}/update/${id}`;
    return this.http.put(url_ima,{ "name" : newdata })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }
  Updateimadetail(id: any, newdata: string) {
    let url_ima = `${this.url}/update/${id}`;
    return this.http.put(url_ima,{ "details" : newdata })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

}
