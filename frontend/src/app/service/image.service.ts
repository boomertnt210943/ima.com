import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Image } from "../models/Image"
import { LocalStorageService } from "angular-web-storage";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  private images: Image[] = [];
  private images$ = new Subject<Image[]>()
  readonly url = "http://localhost:3000/api/images";
  UserId = this.local.get('user').id
  private oneIma?: Image;

  constructor(private http: HttpClient, public local: LocalStorageService) { }



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

  getImageStream() {
    return this.images$.asObservable();
  }


  addImage(name: string, image: File, details: string): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("details", details);
    imageData.append("image", image, name);
    imageData.append("owner_id", this.UserId);
    this.http
      .post<{ image: Image }>(this.url, imageData)
      .subscribe(imageData => {
        const image: Image = {
          _id: imageData.image._id,
          owner_id: this.UserId,
          name: name,
          details: details,
          imagePath: imageData.image.imagePath,
        }
        this.images.push(image);
        this.images$.next(this.images);
      })

  }

}
