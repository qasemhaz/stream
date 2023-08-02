import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { WatchlaterComponent } from './watchlater/watchlater.component';
import { SharedModule } from '../shared/shared.module';
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
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    MainComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    MovieComponent,
    SeriesComponent,
    CategoryComponent,
    ProfileComponent,
    EditprofileComponent,
    FavouriteComponent,
    WatchlaterComponent,
    AllmovieComponent,
    AllseriesComponent,
    MoviedetailsComponent,
    SeriesdetailsComponent,
    CrewComponent,
    PricingComponent,
    ChattComponent,
    ChhhComponent,
    CategorydetailsComponent,
    AllcrewComponent,
    SeriesvideoComponent,
    PaymentComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
