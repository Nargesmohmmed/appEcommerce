import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private _AuthService:AuthService , private _Router:Router) {}

  errMsg:string='';
  isLoading:boolean=false;

  loginFrom : FormGroup = new FormGroup ({

    email : new FormControl("" , [Validators.required , Validators.email]),
    password : new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),

  })

  handleform():void {

    const userData = this.loginFrom.value

    if(this.loginFrom.valid == true) {

      this.isLoading = true

      this._AuthService.login(userData).subscribe({

        next: (response)=>{

          if (response.message === "success") {
            localStorage.setItem("eToken" , response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }

        },

        error: (err : HttpErrorResponse)=> {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }

      })

    }
    else {
      this.loginFrom.markAllAsTouched();
    }

  }

}
