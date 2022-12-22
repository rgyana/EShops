import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, flatMap, Observable } from 'rxjs';
import { SignUp } from '../interfaces/sign-up';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  api = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  userSignup(data: SignUp) {
    this.httpClient
      .post(this.api + 'seller', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['seller-home']);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.httpClient
      .get(this.api + `seller?email=${data.email}&password=${data.password}`, {observe: 'response'})
      .subscribe((result : any) => {
        console.log(result);
        if(result && result.body && result.body.length === 1){
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['seller-home']);
        } else{
          console.log("Login failed");
          this.isLoginError.emit(true);
        }
      });
  }
}
