import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  showNav : boolean = false;

  constructor(public local: LocalStorageService,private router: Router) {
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void{
    console.log(this.local.get('user') === null);
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/signin']);
  }



}
