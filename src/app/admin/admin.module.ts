import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { UserComponent } from './user/user.component';
import { SourceComponent } from './source/source.component';
import { EpisodeComponent } from './episode/episode.component';
import { CrewComponent } from './crew/crew.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MessageComponent } from './message/message.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    MovieComponent,
    SeriesComponent,
    UserComponent,
    SourceComponent,
    EpisodeComponent,
    CrewComponent,
    FooterComponent,
    HomepageComponent,
    MessageComponent,
    AboutComponent,
    ProfileComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
