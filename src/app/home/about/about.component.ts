import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AboutService } from 'src/app/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor( public aboutService:AboutService,private spinner: NgxSpinnerService){

  }

   async ngOnInit(){
    await this.aboutService.GetAboutById(1);
    
  }
}
