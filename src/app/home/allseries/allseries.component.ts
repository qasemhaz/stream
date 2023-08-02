import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavService } from 'src/app/fav.service';
import { SeriesService } from 'src/app/series.service';
import { UserService } from 'src/app/user.service';
import { WatchlaterService } from 'src/app/watchlater.service';

@Component({
  selector: 'app-allseries',
  templateUrl: './allseries.component.html',
  styleUrls: ['./allseries.component.css']
})
export class AllseriesComponent {

  searchTerm: any;
  searchResults: any;
  constructor(public seriesService:SeriesService,public userService:UserService, private router:Router,public favService:FavService,public watchlaterService:WatchlaterService){

  }
  item:any

   async ngOnInit(){
   await this.seriesService.GetAllSeries();

   let info:any=await localStorage.getItem('user');
   this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);
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
    search() {
      const filterValue = this.searchTerm.trim();
    this.searchResults= this.seriesService.GetAllx.filter( (mov: any) => mov.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
}
