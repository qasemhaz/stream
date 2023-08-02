import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { CrewService } from 'src/app/crew.service';
import { CrewseriesmovieService } from 'src/app/crewseriesmovie.service';
import { EpisodeService } from 'src/app/episode.service';
import { FavService } from 'src/app/fav.service';
import { RoleService } from 'src/app/role.service';
import { SeriesService } from 'src/app/series.service';
import { SourceService } from 'src/app/source.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-seriesdetails',
  templateUrl: './seriesdetails.component.html',
  styleUrls: ['./seriesdetails.component.css']
})
export class SeriesdetailsComponent {
  constructor(public seriesService:SeriesService, private router:Router,public categoryService:CategoryService,
              public episodeService:EpisodeService,public sourceService:SourceService,
              public roleService:RoleService,public crewService:CrewService,public userService:UserService,public favService:FavService,
              public crewseriesmovieService:CrewseriesmovieService,public watchlaterService:WatchlaterService){

  }
  item:any

   async ngOnInit(){
    await this.seriesService.GetAllSeries();

   //await this.seriesService.GetSeriesById(1);
   await this.categoryService.GetAllCategory();
   await this.episodeService.GetAllEpisode();
   await this.sourceService.GetAllSource();
   await this.roleService.GetAllRole();
   await this.crewService.GetAllCrew();
   await this.crewseriesmovieService.GetAllMovieSeriesCrew();
   let info:any=await localStorage.getItem('user');
   this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);

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
async  NavigateCat(id:number){
  await this.categoryService.GetCategoryById(id);
    this.router.navigate(["user/categorydetails"])

  }
  async  NavigateCrew(id:number){
    await this.crewService.GetCrewById(id);
      this.router.navigate(["user/crew"])

    }
    async  NavigateVid(id:number){
      await this.sourceService.GetSourceById(id);
        this.router.navigate(["user/seriesvideo"])

      }
}
