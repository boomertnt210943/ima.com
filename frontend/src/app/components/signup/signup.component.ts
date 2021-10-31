import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  authForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  previewLoaded: boolean = false;

  get f(){
    return this.authForm.controls;
  }

  //user!: any

  constructor(private router: Router,private auth: AuthService,) { }

  ngOnInit(): void {
  }


  signUp(){
      console.log(this.authForm.value);
      this.auth.signUp(this.authForm.value).subscribe(
      data => {
        alert('Sign up successfully')
        this.authForm.reset();
      },
      err => {
        console.log(err);
        alert('Cannot insert user to DB!');
      }
    );
    this.router.navigate(['/signin']);
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        this.authForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true
          this.authForm.patchValue({
            img: reader.result
          })
        }
      }
    }
  }

  resetForm() {
    this.authForm.reset();
    this.previewLoaded = false;
  }

}
