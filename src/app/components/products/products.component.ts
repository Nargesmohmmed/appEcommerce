import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor (private _EcomdataService:EcomdataService ,
    private _CartService:CartService ,
    private _ToastrService:ToastrService) {}

  products: Product[] = [];

  searchTerm: string = '';

  addCart(id:string):void {

    this._CartService.addToCart(id).subscribe({

      next: (respons) => {
        console.log(respons);

        this._ToastrService.success(respons.message , "Fresh Cart");
      },
      error: (err) => {
        console.log(err);
      }

    })

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

  }

}
