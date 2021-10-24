import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router,private auth: AuthService) { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.authForm.value);
    this.auth.signUp(this.authForm.value).subscribe(
      data => {
        alert('Sign up successfully')
      },
      err => {
        console.log(err);
        alert('Cannot insert user to DB!');
      }
    );
  }

}
