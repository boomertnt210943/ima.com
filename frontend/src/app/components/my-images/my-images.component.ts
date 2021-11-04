import { Component, OnInit,Input } from '@angular/core';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.css']
})
export class MyImagesComponent implements OnInit {

  @Input() images!: Image[];
  constructor(){
    }

  ngOnInit(): void {
  }

}
