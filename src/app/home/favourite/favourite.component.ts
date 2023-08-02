import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {

  constructor(public movieService:MovieService,public seriesService:SeriesService,
              public favService:FavService,public userService:UserService, private router:Router){

  }

  item:any
  list:any

   async ngOnInit(){
    let info:any=await localStorage.getItem('user');
    this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);

    await this.favService.GetAllFav();

    var x=await  this.favService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
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
        await this.favService.Delete(id);
        await  this.favService.GetAllFav()
       var x= await  this.favService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
       this.list=x
            }
            async DeleteSer(id: number) {
              await this.favService.Delete(id);
              await  this.favService.GetAllFav()
             var x= await  this.favService.GetAllx.filter( (fav: any) => fav.userid==this.item.userinfo )
             this.list=x
                  }
}
