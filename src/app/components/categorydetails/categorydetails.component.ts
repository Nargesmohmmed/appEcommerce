import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService) {}

  CategoryId:string|null = '';

  CategoryDetails:Category = {
    _id: '',
    name: '',
    slug: '',
    image: ''
  };

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({

      next: (parms) => {

        this.CategoryId = parms.get('id')

      }

    })

    this._EcomdataService.getCategoydetalis(this.CategoryId).subscribe({

      next: (response) => {

        this.CategoryDetails = response.data
        console.log(response)


      }

    })

  }


}
