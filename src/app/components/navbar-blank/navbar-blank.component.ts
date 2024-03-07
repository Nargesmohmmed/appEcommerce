import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _Router:Router , private _CartService:CartService){}



  logOutUser(): void {
    this._AuthService.logOut();
  }

  carNum:number = 0;

  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({

      next: (data) => {

        this.carNum = data;

      }

    })

    this._CartService.getUserCart().subscribe({

      next: (respons) => {

        this.carNum = respons.numOfCartItems;

      }

    })

  }

}
