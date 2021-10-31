import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {


  name !: string
  username !: string
  profileURL!:string
  userId: any;

  constructor(private local: LocalStorageService) { }

  ngOnInit(): void {
    this.userId=this.local.get('user').id;
    this.name=this.local.get('user').name
    this.username =this.local.get('user').email
    this.profileURL=this.local.get('user').img
    //this.profileURL="https://sv1.picz.in.th/images/2021/10/24/uUPjQe.png"
  }


}
