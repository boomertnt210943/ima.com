import { NavbarComponent } from './../navbar/navbar.component';
import { Image } from 'src/app/models/Image';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  name !: string
  profileURL!: string
  userId: any;
  token:any;
  authForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  previewLoaded: boolean = false;


  constructor(private local: LocalStorageService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token
    this.userId = this.local.get('user').result.id
    this.name = this.local.get('user').result.name
    this.profileURL = this.local.get('user').result.img

  }

  userUpdate() {
    console.log(this.authForm.value)
    if(!(this.authForm.value.name===''||this.authForm.value.img==='')){
      this.auth.Update(this.userId, this.authForm.value).subscribe(
        data => {
          alert('Update user successfully')
          this.authForm.reset();
          this.router.navigateByUrl('/profile');
        },
        err => {
          console.log(err);
          alert('Cannot update user!');
        }
      );
    }else if(!(this.authForm.value.name==='')){
      this.auth.Update(this.userId, {name:this.authForm.value.name}).subscribe(
        data => {
          alert('Update user successfully')
          this.authForm.reset();
          this.router.navigateByUrl('/profile');
        },
        err => {
          console.log(err);
          alert('Cannot update user!');
        }
      );
    }else if(!(this.authForm.value.img==='')){
      this.auth.Update(this.userId, {img:this.authForm.value.img}).subscribe(
        data => {
          alert('Update user successfully')
          this.authForm.reset();
          this.router.navigateByUrl('/profile');
        },
        err => {
          console.log(err);
          alert('Cannot update user!');
        }
      );
    }
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
