import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/category.service';
import { CrewService } from 'src/app/crew.service';
import { CrewseriesmovieService } from 'src/app/crewseriesmovie.service';
import { FavService } from 'src/app/fav.service';
import { HomepageService } from 'src/app/homepage.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import { TestimonialService } from 'src/app/testimonial.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
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
        items: 4
      }
    },
    nav: false
  }
  customOptionss: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
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
        items: 4
      }
    },
  }
  customOptionsss: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
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
        items: 4
      }
    },
  }
  customOptionssss: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
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
        items: 4
      }
    },
    nav:true
  }

  constructor(public categoryService:CategoryService,public favService:FavService,public watchlaterService:WatchlaterService,public crewseriesmovieService:CrewseriesmovieService, private router:Router,public homepageService:HomepageService
              ,public testimonialService:TestimonialService,public seriesService:SeriesService,public crewService:CrewService,public userService:UserService,public movieService:MovieService){

  }

  Top:any
   async ngOnInit(){
    await this.seriesService.GetAllSeries();

    await this.movieService.GetAllMovie();

   await this.categoryService.GetAllCategory();
   await this.crewseriesmovieService.GetAllMovieSeriesCrew();
   await this.crewService.GetAllCrew();

   await this.homepageService.GetAllHome();
   await this.testimonialService.GetAllTest();
   await this.userService.GetAllUser();

  //  this.Top = this.movieService.GetAllx.filter((mov: any) => mov.rate === Math.max(...this.movieService.GetAllx.map((movie: any) => movie.rate)));
  var x=this.movieService.GetAllx.sort((a: any, b: any) => b.rate - a.rate);
  this.Top = x.slice(0, 4);
  console.log(this.Top);


  }

  rate(i: number) {
    return new Array(i);
  }
  async  Navigate(id:number){
    await this.movieService.GetMovieById(id);
      this.router.navigate(["user/moviedetails"])

    }
    async  NavigateCat(id:number){
      await this.categoryService.GetCategoryById(id);
        this.router.navigate(["user/categorydetails"])

      }

      async  NavigateSer(id:number){
        await this.seriesService.GetSeriesById(id);
        this.router.navigate(["user/seriesdetails"])
        }

        async  NavigateCrew(id:number){
          await this.crewService.GetCrewById(id);
          this.router.navigate(["user/crew"])
          }

}
