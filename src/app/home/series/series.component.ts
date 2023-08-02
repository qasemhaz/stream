import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/category.service';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
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

  constructor(public seriesService:SeriesService,public categoryService:CategoryService,
              public favService:FavService,public userService:UserService,public watchlaterService:WatchlaterService, private router:Router){

  }
  popular:any
  latest:any
   async ngOnInit(){
   await this.seriesService.GetAllSeries();
   await this.categoryService.GetAllCategory();

   let info:any=await localStorage.getItem('user');
   this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);
   this.popular=await  this.seriesService.GetAllx.filter( (mov: any) => mov.rate>=7 )

    const endDate = new Date('2016-06-04');

   this.latest=await  this.seriesService.GetAllx.filter( (mov: any) =>{const itemDate = new Date(mov.productionyear)
                                                        return itemDate.getTime() > endDate.getTime();})
     }
  rate(i: number) {
    return new Array(i);
}
Add(id: number) {
  const fav = {
    movieid: null,
    userid:Number(this.item.userinfo),
    seriesid:id,
    episodeid:null,
  }
  this.favService.insert(fav);
}
Later(id: number) {
  const late = {
    movieid: null,
    userid:Number(this.item.userinfo),
    seriesid:id,
    episodeid:null,
  }
  this.watchlaterService.insert(late);
}

async  Navigate(id:number){
  await this.seriesService.GetSeriesById(id);
    this.router.navigate(["user/seriesdetails"])

  }
  async  All(){
      this.router.navigate(["user/allseries"])
    }
}
