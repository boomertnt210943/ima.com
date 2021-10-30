import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(public local: LocalStorageService,private router: Router) {
  }

  ngOnInit(): void {
  }
  signout(){
    this.local.clear();
    this.router.navigate(['/signin']);
  }




}
