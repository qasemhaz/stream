import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { PricinguserService } from 'src/app/pricinguser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public loginService : LoginService,private pricinguserService : PricinguserService){}

  loginform:FormGroup=new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  }
  );

  async ngOnInit(){
    await this.pricinguserService.GetAllPricinguser();
    await this.loginService.GetAllLogin();
    await this.pricinguserService.GetAllx.forEach((element: {userid: any ,id: any ,activedate: any; })=> {


      const currentDate = Date.now();
      const endDate = new Date(currentDate);
      if(endDate.toISOString()>element.activedate){
        var x=this.loginService.GetAllx.filter( (log: any) => log.userid==element.userid )
        x[0].roleid=2
        this.loginService.Update(x[0])
        this.pricinguserService.Delete(element.id)}
    });
  }


  async login(){
    await this.loginService.login(this.loginform.value)
    console.log(this.loginform.value)
  }
}
