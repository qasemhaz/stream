import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { UserComponent } from './user/user.component';
import { SourceComponent } from './source/source.component';
import { EpisodeComponent } from './episode/episode.component';
import { CrewComponent } from './crew/crew.component';
import { MessageComponent } from './message/message.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'category',component:CategoryComponent},
  {path:'movie',component:MovieComponent},
  {path:'series',component:SeriesComponent},
  {path:'user',component:UserComponent},
  {path:'source',component:SourceComponent},
  {path:'episode',component:EpisodeComponent},
  {path:'crew',component:CrewComponent},
  {path:'message',component:MessageComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'about',component:AboutComponent},
  {path:'footer',component:FooterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'pricing',component:PricingComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
