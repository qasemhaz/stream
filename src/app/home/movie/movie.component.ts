import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/category.service';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav:true
  }
  item:any

  constructor(public movieService:MovieService,public categoryService:CategoryService,
              public favService:FavService,public userService:UserService,public watchlaterService:WatchlaterService, private router:Router){

  }
  popular:any
  latest:any

   async ngOnInit(){
   await this.movieService.GetAllMovie();
   await this.categoryService.GetAllCategory();
   let info:any=await localStorage.getItem('user');
   this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);

   this.popular=await  this.movieService.GetAllx.filter( (mov: any) => mov.rate>=7 )

    const endDate = new Date('2016-06-04');

   this.latest=await  this.movieService.GetAllx.filter( (mov: any) =>{const itemDate = new Date(mov.productionyear)
                                                        return itemDate.getTime() > endDate.getTime();})


  }


  rate(i: number) {
    return new Array(i);
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
  async  All(){
      this.router.navigate(["user/allmovie"])
    }
}
