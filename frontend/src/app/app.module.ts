import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { UploadComponent } from './components/upload/upload.component';
import { SingleImageComponent } from './components/single-image/single-image.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MyImagesComponent } from './components/my-images/my-images.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FilterPipe } from './searchfilter/filter.pipe';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfilepageComponent,
    UploadComponent,
    SingleImageComponent,
    FavoritesComponent,
    MyImagesComponent,
    EditUserComponent,
    FilterPipe,
    EditImageComponent,
    CommentsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
