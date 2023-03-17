import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SignUp } from '../interfaces/sign-up';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  api_url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // seller signup
  userSignup(data: SignUp) {
    this.httpClient
      .post(this.api_url + 'seller', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['seller-home']);
        }
      });
  }

  // reload seller
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  // seller login
  userLogin(data: Login) {
    this.httpClient
      .get(
        this.api_url + `seller?email=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['seller-home']);
        } else {
          console.log('Login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
