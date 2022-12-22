import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
  // { path: "", redirectTo: "home"},
  { path: "", component: HomeComponent},
  { path: "seller-home", component: SellerHomeComponent},
  { path: "seller", component: SellerComponent},
  { path: "about-us", component: AboutUsComponent},
  { path: "contact-us", component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
