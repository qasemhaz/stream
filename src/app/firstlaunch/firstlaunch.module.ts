import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstlaunchRoutingModule } from './firstlaunch-routing.module';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PricingComponent } from './pricing/pricing.component';


@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    HomeComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    FirstlaunchRoutingModule,
    SharedModule
  ]
})
export class FirstlaunchModule { }
