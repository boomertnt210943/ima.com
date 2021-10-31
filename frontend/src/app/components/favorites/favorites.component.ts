import { Component, OnDestroy, OnInit, OnChanges, DoCheck } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Image } from 'src/app/models/Image';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
