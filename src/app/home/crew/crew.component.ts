import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CrewService } from 'src/app/crew.service';
import { CrewseriesmovieService } from 'src/app/crewseriesmovie.service';
import { MovieService } from 'src/app/movie.service';
import { RoleService } from 'src/app/role.service';
import { SeriesService } from 'src/app/series.service';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['<-', '->'],
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


  constructor(public crewService: CrewService,public movieService: MovieService,
              public seriesService: SeriesService,public roleService: RoleService
              ,public crewseriesmovieService: CrewseriesmovieService, private router:Router) {}
  async ngOnInit() {
    await this.crewService.GetAllCrew();

    //await this.crewService.GetCrewById(4);
    await this.movieService.GetAllMovie();
    await this.seriesService.GetAllSeries();
    await this.roleService.GetAllRole();
    await this.crewseriesmovieService.GetAllMovieSeriesCrew();


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
