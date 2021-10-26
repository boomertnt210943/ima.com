import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Image } from "../models/images";

@Injectable({
  providedIn: "root",
})
export class ImageService {

  private images:Image[]=[];
  

  constructor(private http: HttpClient) {}


}
