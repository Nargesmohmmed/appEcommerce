import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [

  {path : '',
    component:AuthLayoutComponent , children: [

    {path : '' , redirectTo:'login' , pathMatch : 'full'},
    {path : 'login', component:LoginComponent , title: 'Login'},
    {path : 'register', component:RegisterComponent , title: 'Register'},
    {path : 'forgotpassword', component:ForgotpasswordComponent , title: 'Forgotpassword'},
  ]},

  {path : ''
  // canActivate : [authGuard]
  , component:BlankLayoutComponent
   , children: [

    {path : '' , redirectTo:'home' , pathMatch : 'full'},
    {path : 'home', component:HomeComponent , title: 'Home'},
    {path : 'cart', component:CartComponent , title: 'Cart'},
    {path : 'forgotpassword', component:ForgotpasswordComponent , title: 'Forgotpassword'},
    {path : 'products', component:ProductsComponent , title: 'Products'},
    {path : 'allorders', component:AllordersComponent , title: 'Allorders'},
    {path : 'checkout/:id', component:CheckoutComponent , title: 'Checkout'},
    {path :'details/:id' , component:DetailsComponent , title: 'Details'},
    {path : 'categories', component:CategoriesComponent , title: 'Categories'},
    {path : 'Categorydetails/:id', component:CategorydetailsComponent , title: 'Categories'},
    {path : 'Wishlist', component:WishlistComponent , title: 'Wish list'},
    {path : 'brands', component:BrandsComponent , title: 'brands'}

  ],
},


  {path : '**', component:NotfoundComponent , title: 'Notfound'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
