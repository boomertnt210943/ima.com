import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  dataUser: any

  constructor(private local: LocalStorageService, private auth: AuthService) {}

  ngOnInit(): void {
    let id  = this.local.get('user').id;
    this.getUser(id);
  }
  getUser(id: any) {
    this.auth.getUser(id).subscribe(
      dataUser => {
        this.dataUser = dataUser;
        console.log(dataUser)
      })
  }
}
