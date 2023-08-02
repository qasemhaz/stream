import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/category.service';
import { CrewService } from 'src/app/crew.service';
import { CrewseriesmovieService } from 'src/app/crewseriesmovie.service';
import { FavService } from 'src/app/fav.service';
import { MovieService } from 'src/app/movie.service';
import { ReviewService } from 'src/app/review.service';
import { RoleService } from 'src/app/role.service';
import { SourceService } from 'src/app/source.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent {
  CreateForm = new FormGroup({
    comments: new FormControl(''),
    Iduser: new FormControl(this.userService.GetxById.id, Validators.required),
    Idmovie : new FormControl(this.movieService.GetxById.id,Validators.required),


  });
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

  constructor(public movieService:MovieService,public categoryService:CategoryService,
              public sourceService:SourceService,public crewService:CrewService,
              public crewseriesmovieService:CrewseriesmovieService,public roleService:RoleService
              ,public favService:FavService,public userService:UserService,public watchlaterService:WatchlaterService,public reviewService:ReviewService,
               private router:Router){

  }
  item:any

   async ngOnInit(){
    await this.movieService.GetAllMovie();
  //  await this.movieService.GetMovieById(1);
   await this.categoryService.GetAllCategory();
   await this.sourceService.GetAllSource();
   await this.crewseriesmovieService.GetAllMovieSeriesCrew();
   await this.crewService.GetAllCrew();
   await this.roleService.GetAllRole();
   await this.reviewService.GetAllReview();
   await this.userService.GetAllUser();
   let info:any=await localStorage.getItem('user');
   this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);


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
  async  NavigateCrew(id:number){
    await this.crewService.GetCrewById(id);
      this.router.navigate(["user/crew"])

    }
    async  NavigateCat(id:number){
      await this.categoryService.GetCategoryById(id);
        this.router.navigate(["user/categorydetails"])

      }


      async AddRev() {
        await this.reviewService.insert(this.CreateForm.value);
        await this.reviewService.GetAllReview();
      }
}
