import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { WatchlaterComponent } from './watchlater/watchlater.component';
import { SeriesComponent } from './series/series.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieComponent } from './movie/movie.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AllmovieComponent } from './allmovie/allmovie.component';
import { AllseriesComponent } from './allseries/allseries.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { SeriesdetailsComponent } from './seriesdetails/seriesdetails.component';
import { CrewComponent } from './crew/crew.component';
import { PricingComponent } from './pricing/pricing.component';
import { ChattComponent } from './chatt/chatt.component';
import { ChhhComponent } from './chhh/chhh.component';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { AllcrewComponent } from './allcrew/allcrew.component';
import { SeriesvideoComponent } from './seriesvideo/seriesvideo.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'about',component:AboutComponent},
  {path:'blog',component:BlogComponent},
  {path:'category',component:CategoryComponent},
  {path:'contact',component:ContactComponent},
  {path:'editprofile',component:EditprofileComponent},
  {path:'favourite',component:FavouriteComponent},
  {path:'movie',component:MovieComponent},
  {path:'profile',component:ProfileComponent},
  {path:'series',component:SeriesComponent},
  {path:'allmovie',component:AllmovieComponent},
  {path:'allseries',component:AllseriesComponent},
  {path:'moviedetails',component:MoviedetailsComponent},
  {path:'seriesdetails',component:SeriesdetailsComponent},
  {path:'watchlater',component:WatchlaterComponent},
  {path:'crew',component:CrewComponent},
  {path:'pricing',component:PricingComponent},
  {path:'chat',component:ChattComponent},
  {path:'chatttt',component:ChhhComponent},
  {path:'categorydetails',component:CategorydetailsComponent},
  {path:'allcrew',component:AllcrewComponent},
  {path:'seriesvideo',component:SeriesvideoComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
