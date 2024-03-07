import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private _HttpClient:HttpClient) { }

  headers:any = {token : localStorage.getItem('eToken')}

  checkOut(cartId:string , userData:object):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,

    {
      shippingAddress: userData
  },

    {
      headers: this.headers
    }

    )
  }

}
