import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';
import { CheckOutService } from 'src/app/shared/service/check-out.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _FormBuilder:FormBuilder ,
    private _ActivatedRoute:ActivatedRoute ,
    private _CheckOutService:CheckOutService ,
    private _CartService:CartService ) {}

  checkout:FormGroup = this._FormBuilder.group({

    details: [''],
    phone : [''],
    city : ['']

  })

  cartId:any = ''; // id cart

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({

      next: (params) =>{

        this.cartId = params.get('id');
        // console.log(params.get('id'));

      }

    })
  }

  handleForm():void {


    this._CheckOutService.checkOut(this.cartId , this.checkout.value).subscribe({

      next: (respons) =>{

        if (respons.status == 'success') {
          window.open(respons.session.url , '_self')
        }

        // console.log(respons);

      }

    })

    // console.log(this.checkout.value);

  }

}
