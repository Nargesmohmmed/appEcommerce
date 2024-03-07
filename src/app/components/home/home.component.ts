import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService ,
     private _CartService:CartService ,
      private _ToastrService:ToastrService,
      private _WishlistService:WishlistService) {}

  products: Product[] = [];

  categories: Category[] = [];

  wishlist: string[] = [];

  searchTerm: string = '';

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

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['1', '2'],
    // يخلي يتحرك بروحه
    autoplay: true,
    // يتحكم بناء علي الشاشات
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlideer: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['1', '2'],
    // يخلي يتحرك بروحه
    autoplay: true,
    items: 1 ,
    nav: false
  }

  ngOnInit(): void {

    // get All Products
    this._EcomdataService.getAllProducts().subscribe ({

      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {

        console.log(err);

      }

    });

    // get Categories

    this._EcomdataService.getCategories().subscribe({

      next: (response)=> {
       this.categories = response.data
      }

    })

    this._WishlistService.getWishlist().subscribe({

      next: (response)=> {

        console.log(response.data);

        const newData = response.data.map((item:any) => item._id);
        this.wishlist = newData

      }

    });

  }

  removeFav (prodId: string| undefined):void {

    this._WishlistService.removeWishlist(prodId).subscribe({

      next: (response)=> {
        console.log(response.data);
        this._ToastrService.success(response.message)
        this.wishlist = response.data;
      },

    });

  }

  addFav (prodId:string) : void {

    this._WishlistService.addToWishlist(prodId).subscribe({

      next: (response)=> {

        console.log(response.data);

        this._ToastrService.success(response.message);
        this.wishlist = response.data;

      },

      error: (err) => {
        console.log(err);
      }

    });

  }


}
