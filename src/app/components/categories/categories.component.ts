import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  constructor( private _EcomdataService:EcomdataService) {}

  categories: Category[] = [];

  ngOnInit(): void {

    // get Categories

    this._EcomdataService.getCategories().subscribe({

      next: (response)=> {
       this.categories = response.data
      }

    })
    

  }

}
