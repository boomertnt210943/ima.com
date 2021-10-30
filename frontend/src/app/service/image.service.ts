import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Image } from "../models/images";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private images: Image[] = [];
  private images$ = new Subject<Image[]>()
  readonly url = "http://localhost:3000/api/images";

  constructor(private http: HttpClient) { }

  getImages() {
    this.http
    .get<{ images: Image[] }>(this.url)
    .pipe(
      map((imageData) => {
        return imageData.images;
      })
    )
    .subscribe((images) => {
      this.images = images;
      this.images$.next(this.images);
    });
  }

  getImageStream() {
    return this.images$.asObservable();
  }

  addImage(name: string, image: File,details:string): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("details", details);
    imageData.append("image", image, name);
    this.http
    .post<{image:Image}>(this.url, imageData)
    .subscribe(imageData => {
      const image:Image = {
        _id:imageData.image._id,
        name:name,
        details:details,
        imagePath:imageData.image.imagePath,
      }
      //this.images.push(image);
      this.images$.next(this.images);
    })

  }
}

