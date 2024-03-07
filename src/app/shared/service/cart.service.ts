import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  headers:any = {token : localStorage.getItem('eToken')}

addToCart(productId:string):Observable<any> {

  let bodyObject:any = {
    productId: productId
}



  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
  bodyObject ,
   {headers: this.headers} )

}

getUserCart():Observable<any>{

  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers: this.headers})

}

removeItem(cartId:string):Observable<any> {
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartId}`, {headers : this.headers})
}

updataCart(productId:string , count:number):Observable<any> {

  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
  {"count" : count} ,
  {headers: this.headers})

}

}
