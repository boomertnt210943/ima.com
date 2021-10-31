import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri:string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public local: LocalStorageService) { }

  signIn(authData: any){
    return this.http.post<any>('http://localhost:3000/login/signin', authData)
      .pipe(map(data => {
        if(data){
          this.local.set('user', data, 1, 'w');
          console.log(this.local.get('user'));
        }
        return data;
      }));

  }
  signUp(authData: any){
    return this.http.post<any>('http://localhost:3000/reg/signup', authData)
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

  Update(id:any,userdata:any){
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, userdata, { headers: this.headers })
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }
}
