import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-allmovie',
  templateUrl: './allmovie.component.html',
  styleUrls: ['./allmovie.component.css']
})
export class AllmovieComponent {

  searchTerm: any;
  searchResults: any;

  constructor(public movieService:MovieService,public userService:UserService,public favService:FavService, private router:Router,public watchlaterService:WatchlaterService){

  }
  item:any

   async ngOnInit(){
   await this.movieService.GetAllMovie();
   await this.favService.GetAllFav();
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
  async  Navigate(id:number){
    await this.movieService.GetMovieById(id);
      this.router.navigate(["user/moviedetails"])

    }

    search() {
      const filterValue = this.searchTerm.trim();
    this.searchResults= this.movieService.GetAllx.filter( (mov: any) => mov.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
}
