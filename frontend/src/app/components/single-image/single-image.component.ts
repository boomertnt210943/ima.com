import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css']
})
export class SingleImageComponent implements OnInit {

  public ima? : string;
  post? : any;

  postIma: any = [
    { "imaId": "1", "imaName": "WdqBvFe", "imaUrl": "https://i.pinimg.com/564x/97/f1/92/97f19270daf01554969db4c8b2012438.jpg", "imaDetail": "36", "like": true },
    { "imaId": "2", "imaName": "Menaka6", "imaUrl": "https://i.pinimg.com/564x/d0/ca/4e/d0ca4efa6354156f846b2e7acc54b9bf.jpg", "imaDetail": "24501", "like": false },
  ]

  constructor(
    private router: ActivatedRoute,
    private imas: ImageService,
    ) {}

  ngOnInit(): void {
    this.ima = this.router.snapshot.params.text;
    console.log(this.ima);
    const ind = Number(this.ima);
    this.post = this.postIma[ind];
  }

}
