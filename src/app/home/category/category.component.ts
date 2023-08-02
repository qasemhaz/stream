import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  searchTerm: any;
  searchResults: any;

  constructor( private router:Router,public categoryService:CategoryService){

  }

   async ngOnInit(){
    await this.categoryService.GetAllCategory();
  }
  async  Navigate(id:number){
    await this.categoryService.GetCategoryById(id);
      this.router.navigate(["user/categorydetails"])

    }
    search() {
      const filterValue = this.searchTerm.trim();
    this.searchResults= this.categoryService.GetAllCategoryv.filter( (mov: any) => mov.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
}
