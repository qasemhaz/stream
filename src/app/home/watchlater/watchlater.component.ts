import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.component.html',
  styleUrls: ['./watchlater.component.css']
})
export class WatchlaterComponent {
  constructor(public movieService:MovieService,public seriesService:SeriesService,
    public watchlaterService:WatchlaterService,public userService:UserService, private router:Router){

}
item:any
list:any

  async ngOnInit(){



    let info:any=await localStorage.getItem('user');
    this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);
console.log(this.userService.GetxById);

   await this.watchlaterService.GetAllWatchLater();

   var x= await  this.watchlaterService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
this.list=x
console.log(this.list);

    await this.movieService.GetAllMovie();
    await this.seriesService.GetAllSeries();
    }

    async  Navigate(id:number){
      await this.movieService.GetMovieById(id);
        this.router.navigate(["user/moviedetails"])

      }
      async  NavigateSer(id:number){
        await this.seriesService.GetSeriesById(id);
          this.router.navigate(["user/seriesdetails"])

        }


        async DeleteMov(id: number) {
          await this.watchlaterService.Delete(id);
          await  this.watchlaterService.GetAllWatchLater()
         var x= await  this.watchlaterService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
         this.list=x
              }
              async DeleteSer(id: number) {
                await this.watchlaterService.Delete(id);
                await  this.watchlaterService.GetAllWatchLater()
               var x= await  this.watchlaterService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
               this.list=x
                    }
}
