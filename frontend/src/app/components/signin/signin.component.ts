import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //show: boolean = false;

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  name !: any
  constructor(private router: Router, private auth: AuthService, public local: LocalStorageService) {
   }

  ngOnInit(): void {
  }

  get f() {
    return this.authForm.controls;
  }


  signIn() {
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if (data.status == true) {
          console.log(data)
          //this.local.set('user',data.result)
          this.router.navigate(['/home']);
        } else {
          alert('Email or Password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Email or Password is incorrect!');
      }
    );
  }

}
