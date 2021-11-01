import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { UploadComponent } from './components/upload/upload.component';
import { SingleImageComponent } from './components/single-image/single-image.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {EditImageComponent} from './components/edit-image/edit-image.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfilepageComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'edit', component: EditUserComponent},
  {path: 'ima/:text', component: SingleImageComponent},
  {path: 'edit/:text', component: EditImageComponent},
  {path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
