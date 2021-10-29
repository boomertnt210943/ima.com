import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images: any

  constructor(private http: HttpClient) { }

  addImage(image: any) {
    return this.http.post<any>('http://localhost:3000/images/img', image)
      .pipe(map(data => { return data }))
  }

  getImages(){
    return this.http.get<any>('http://localhost:3000/images/img')
    .pipe(map(data => {
      if(data){
        this.images =data;
        console.log(this.images);
      }
      return this.images;
    }))
  }

}

