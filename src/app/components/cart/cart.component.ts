import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService) {}

  cartDetails:any = {};

  removeCartItem(CartId:string):void {

    this._CartService.removeItem(CartId).subscribe({

      next: (respons) => {

        this.cartDetails = respons.data
        this._CartService.cartNumber.next(respons.numOfCartItems)

      },
      error: (err) => {
        console.log(err.message);
      }

    })

  }

  ngOnInit(): void {

    this._CartService.getUserCart().subscribe({
      next: (respons)=> {
        console.log(respons.data)
        this.cartDetails = respons.data;
      },

      error: (err)=> {
        console.log(err);
      }

    })

  }

  changeCount(id:string , count:number): void {

    if (count > 0) {

      this._CartService.updataCart(id , count).subscribe ({

        next: (respons) => {
          this.cartDetails = respons.data;
        },
        error: (err) => {
          console.log(err);
        }

      })

    }

  }


}
