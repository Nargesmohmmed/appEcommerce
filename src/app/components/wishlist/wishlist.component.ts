import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService , private _ToastrService:ToastrService , private _CartService:CartService){}


  products: Product[] = [];


  ngOnInit(): void {

    this._WishlistService.getWishlist().subscribe({

      next: (respons) => {

        this.products = respons.data;

      }

    })

  }


  addCart(id:string):void {

    this._CartService.addToCart(id).subscribe({

      next: (respons) => {
        console.log(respons);

        this._ToastrService.success(respons.message , "Fresh Cart");
        this._CartService.cartNumber.next(respons.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }

    })

  }


  addFav (prodId:string) : void {

    this._WishlistService.addToWishlist(prodId).subscribe({

      next: (response)=> {

        console.log(response.data);

        this._ToastrService.success(response.message);

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

}
