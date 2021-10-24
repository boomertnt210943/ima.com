import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { imageModel } from 'src/app/image.module';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postImage = new FormGroup({
    imaId: new FormControl('',[Validators.required]),
    imaName: new FormControl('',[Validators.required]),
    imaUrl: new FormControl('',[Validators.required]),
    imaDetail: new FormControl('',[Validators.required]),
  });

  postIma: images =[
    {"imaId":"1","imaName":"WdqBvFe","imaUrl":"https://i.pinimg.com/564x/97/f1/92/97f19270daf01554969db4c8b2012438.jpg","imaDetail":"36","like":true},
    {"imaId":"12","imaName":"Menaka6","imaUrl":"https://i.pinimg.com/564x/d0/ca/4e/d0ca4efa6354156f846b2e7acc54b9bf.jpg","imaDetail":"24501","like":false},
    {"imaId":"21","imaName":"dkwqp][","imaUrl":"https://i.pinimg.com/564x/75/0b/f0/750bf021aae3018a6069b97092324b08.jpg","imaDetail":"23","like":true},
    {"imaId":"32","imaName":"EZima","imaUrl":"https://i.pinimg.com/564x/16/40/21/1640212c5499b3aa9e1dafac5fff5447.jpg","imaDetail":"23","like":false},
    {"imaId":"43","imaName":"duck","imaUrl":"https://i.pinimg.com/564x/40/1e/97/401e971c816e61ccd01b6184da43c404.jpg","imaDetail":"duck duck duck","like":false},
    {"imaId":"45","imaName":"hello","imaUrl":"https://i.pinimg.com/564x/86/55/2e/86552e52e7e3b65dadf0e0fdb650cbec.jpg","imaDetail":"23","like":false},
    {"imaId":"56","imaName":"Shylu","imaUrl":"https://i.pinimg.com/564x/80/f7/7c/80f77c624b4e7e0a2815c1f254ad1e7e.jpg","imaDetail":"23","like":false},
    {"imaId":"57","imaName":"test123","imaUrl":"https://i.pinimg.com/564x/42/a8/6c/42a86c6d2efdeece0cbc5e198b45268f.jpg","imaDetail":"23","like":false},
    {"imaId":"67","imaName":"yusuu","imaUrl":"https://i.pinimg.com/564x/4c/d3/e0/4cd3e099fa60bf88ae45c503cadf584b.jpg","imaDetail":"UwU","like":false},
    {"imaId":"68","imaName":"test-709","imaUrl":"https://i.pinimg.com/564x/5b/ed/74/5bed749ce53d594f35d16b9083f56510.jpg","imaDetail":"23","like":false},
    {"imaId":"78","imaName":"test-654","imaUrl":"https://i.pinimg.com/236x/29/cf/af/29cfafe08a88753300f5dc37cf363659.jpg","imaDetail":"23","like":false},
    {"imaId":"81","imaName":"test-127","imaUrl":"https://i.pinimg.com/564x/cc/bb/07/ccbb07aac350e131e4bed356b5b9b8ee.jpg","imaDetail":"23","like":false},
    {"imaId":"92","imaName":"kawaeiii","imaUrl":"https://i.pinimg.com/564x/77/43/40/774340078f60d0df6109b973ab0cc3c7.jpg","imaDetail":"M_M","like":false},
    {"imaId":"98","imaName":"child","imaUrl":"https://i.pinimg.com/564x/67/40/7b/67407b754df34c267e0f21e0f29a3626.jpg","imaDetail":"23","like":false}
  ]

  //like: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(ima: images){
    let index = this.postIma.indexOf(ima);
    this.postIma[index].like = !ima.like;
    console.log(this.postIma[index].like);
  }
}
