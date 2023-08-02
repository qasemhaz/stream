import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private route:Router,public loginService : LoginService ,public userService:UserService){}

  RegForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    image:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required])
  });
  async Register() {
    let userObj={
      name:this.RegForm.value["name"],
      phone:this.RegForm.value["phone"],
      email:this.RegForm.value["email"],
      image:this.RegForm.value["image"],
    }

    await this.userService.insert(userObj);

    await this.userService.GetAllUser()
    let id=Math.max(...this.userService.GetAllx.map((x: { id: any; }) => x.id))

    let logObj={
      username:this.RegForm.value["email"],
      password:this.RegForm.value["pass"],
      roleid:2,
      userid:id,
    }
    await this.loginService.insert(logObj)
    this.route.navigate(['auth/login'])
  }

  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.userService.UploadImage(formData)
      this.RegForm.controls['image'].setValue(this.userService.imageName)

      }
      }
    }

    async RegisterWithGoogle() {
      //await this.loginService.google();
      this.route.navigate(['auth/login'])
    }

}
