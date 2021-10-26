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

  postIma: imageModel =[
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
    {"imaId":"98","imaName":"child","imaUrl":"https://i.pinimg.com/564x/67/40/7b/67407b754df34c267e0f21e0f29a3626.jpg","imaDetail":"23","like":false},
    {"imaId":"99","imaName":"4eve1","imaUrl":"https://i.pinimg.com/564x/1b/30/a3/1b30a36fbac1f01d0e7b304d1dfd043e.jpg","imaDetail":"150","like":false},
    {"imaId":"100","imaName":"4eve2","imaUrl":"https://i.pinimg.com/236x/11/9f/6f/119f6fac4e4de1486b9194e4636d4f62.jpg","imaDetail":"100","like":false},
    {"imaId":"101","imaName":"4eve3","imaUrl":"https://i.pinimg.com/564x/99/c5/6d/99c56daf08116324d21fd6d2b96bc152.jpg","imaDetail":"100","like":false},
    {"imaId":"102","imaName":"4eve4","imaUrl":"https://i.pinimg.com/564x/8b/aa/8e/8baa8e14de10058d24eed226572f7b3e.jpg","imaDetail":"100","like":false},
    {"imaId":"103","imaName":"4eve5","imaUrl":"https://i.pinimg.com/564x/08/5b/24/085b244dc81f0fd98ca665f21c5e9b51.jpg","imaDetail":"100","like":false},
    {"imaId":"104","imaName":"4eve6","imaUrl":"https://i.pinimg.com/564x/c0/bc/97/c0bc971a057d22edc16215072f18f88a.jpg","imaDetail":"100","like":false},
    {"imaId":"105","imaName":"4eve7","imaUrl":"https://i.pinimg.com/564x/58/f8/5d/58f85d2033f6542dc6dec87282c4e2d7.jpg","imaDetail":"100","like":false},
    {"imaId":"106","imaName":"4eve8","imaUrl":"https://i.pinimg.com/564x/90/24/04/9024048fd1935ada02cc84227dfd593e.jpg","imaDetail":"100","like":false},
    {"imaId":"107","imaName":"4eve9","imaUrl":"https://i.pinimg.com/564x/2e/25/75/2e2575c8ea6860754b1dbd99c7ae7fc3.jpg","imaDetail":"100","like":false},
    {"imaId":"108","imaName":"4eve10","imaUrl":"https://i.pinimg.com/564x/b7/74/af/b774af4896eea67de93cc3476a12920e.jpg","imaDetail":"100","like":false},
  ]

  //like: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(ima: any){
    let index = this.postIma.indexOf(ima);
    this.postIma[index].like = !ima.like;
    //console.log(this.postIma[index].like);
  }
}
