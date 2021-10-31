import { Component, OnInit, ViewChild, DoCheck, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { ImageService } from 'src/app/service/image.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck , OnChanges{

  public searchImg !: string;
  public totalItem : number = 0;

  showNav : boolean = !(this.local.get('user') === null);

  constructor(public local: LocalStorageService,private router: Router,private imgS: ImageService) {
  }

  ngOnInit(): void {
    if(this.local.get('user') === null){
      this.router.navigate(['/signin']);
    }

  }

  ngOnChanges(): void{
    console.log(this.local.get('user') === null);
  }

  ngDoCheck(): void{
    this.showNav = !(this.local.get('user') === null);
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/signin']);
  }

  search(event:any){
    this.searchImg = (event.target as HTMLInputElement).value;
    console.log(this.searchImg);
    this.imgS.search.next(this.searchImg);
  }



}
