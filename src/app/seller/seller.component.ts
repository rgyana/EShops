import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  constructor( private sellerService: SellerService) {}

  ngOnInit(): void {}

  signUp(data: object): void {
    this.sellerService.userSignup(data);
  }
}
