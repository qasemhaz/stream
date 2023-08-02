import { Component } from '@angular/core';
import { TestimonialService } from 'src/app/testimonial.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public testimonialService:TestimonialService,public userService:UserService){

  }

   async ngOnInit(){
   await this.testimonialService.GetAllTest();
   await this.userService.GetAllUser();
  }
  async Accept(obj:any){
    obj.status="accepted"
    await this.testimonialService.Update(obj);
   }
   async Reject(obj:any){
    obj.status="rejected"
    await this.testimonialService.Update(obj);
   }
}
