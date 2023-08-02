import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { AdminfooterComponent } from './adminfooter/adminfooter.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { HomeheaderComponent } from './homeheader/homeheader.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { NgxPayPalModule } from 'ngx-paypal';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { FirstheaderComponent } from './firstheader/firstheader.component';
import { FirstfooterComponent } from './firstfooter/firstfooter.component';

@NgModule({
  declarations: [
    AdminfooterComponent,
    AdminheaderComponent,
    AdminsidebarComponent,
    HomefooterComponent,
    HomeheaderComponent,
    FirstheaderComponent,
    FirstfooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ],
  exports:[
    HomeheaderComponent,
    HomefooterComponent,
    AdminfooterComponent,
    AdminheaderComponent,
    AdminsidebarComponent,
    FirstheaderComponent,
    FirstfooterComponent,
    NgImageSliderModule,
    MatSliderModule,
    MatPaginatorModule,
    CarouselModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    NgxPayPalModule,
    MdbModalModule,
    NgxSpinnerModule,

  ]
})
export class SharedModule {

 }
