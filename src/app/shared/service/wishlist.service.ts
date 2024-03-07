import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  besUrl:string = `https://ecommerce.routemisr.com/api/v1/`

  headers:any = {token : localStorage.getItem('eToken')}

  constructor(private _HttpClient:HttpClient) { }

  addToWishlist(prodId:string):Observable<any>{

    return this._HttpClient.post(this.besUrl + `wishlist`, {

      productId: prodId

    },
    {headers: this.headers})

  }

  getWishlist():Observable<any>{

    return this._HttpClient.get(this.besUrl + `wishlist ` ,  {headers: this.headers})

  }

  removeWishlist(prodId:string | undefined):Observable<any>{

    return this._HttpClient.delete(this.besUrl + `wishlist/${prodId}`,  {headers: this.headers})

  }

}
