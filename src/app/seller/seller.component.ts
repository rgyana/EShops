import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../interfaces/sign-up';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  showLogin = false;
  authError: string = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  // sign up function
  signUp(data: SignUp): void {
    this.sellerService.userSignup(data);
  }

  // login function
  login(data: Login): void {
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError =
          'Email or password is not currect. please enter valid inputs';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
}
