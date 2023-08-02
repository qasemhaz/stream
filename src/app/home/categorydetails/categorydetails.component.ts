import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent {
  constructor(public categoryService:CategoryService,public seriesService:SeriesService,public movieService:MovieService,
    public favService:FavService,public userService:UserService, private router:Router,public watchlaterService:WatchlaterService){

  }
  item:any

   async ngOnInit(){
    await this.categoryService.GetAllCategory();
    await this.seriesService.GetAllSeries();
   await this.movieService.GetAllMovie();
   let info:any=await localStorage.getItem('user');
this.item=await JSON.parse(info);
await this.userService.GetUserById(this.item.userinfo);

  }
  Add(id: number) {
    const fav = {
      movieid: id,
      userid:Number(this.item.userinfo),
      seriesid:null,
      episodeid:null,
    }
    this.favService.insert(fav);
  }
  Later(id: number) {
    const late = {
      movieid: id,
      userid:Number(this.item.userinfo),
      seriesid:null,
      episodeid:null,
    }
    this.watchlaterService.insert(late);
  }
  Adds(id: number) {
    const fav = {
      movieid: null,
      userid:Number(this.item.userinfo),
      seriesid:id,
      episodeid:null,
    }
    this.favService.insert(fav);
  }
  Laters(id: number) {
    const late = {
      movieid: null,
      userid:Number(this.item.userinfo),
      seriesid:id,
      episodeid:null,
    }
    this.watchlaterService.insert(late);
  }
  async  Navigate(id:number){
    await this.movieService.GetMovieById(id);
      this.router.navigate(["user/moviedetails"])

    }
    async  NavigateSer(id:number){
      await this.seriesService.GetSeriesById(id);
        this.router.navigate(["user/seriesdetails"])

      }
}
