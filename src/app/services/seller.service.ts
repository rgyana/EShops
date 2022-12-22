import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUp } from '../sign-up';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  api = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  userSignup(data: SignUp): Observable<any> {
    return this.httpClient.post<any>(this.api + 'seller', data);
  }
}
