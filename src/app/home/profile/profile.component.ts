import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login.service';
import { UserService } from 'src/app/user.service';
import { passwordMatch } from 'src/validators/passwordMatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  UpdateForm = new FormGroup({
    id: new FormControl(this.userService.GetxById.id),
    name: new FormControl('', Validators.required),
    image : new FormControl('',Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),

  });

  ChangePasswordForm = new FormGroup(
    {
      current: new FormControl('',Validators.required),
      newPassword: new FormControl('',Validators.required),
      repeat: new FormControl('',Validators.required)
    },
    [passwordMatch("newPassword","repeat")]
  )

  constructor(
    public userService: UserService,    public loginService: LoginService,
    public dialog: MatDialog, private toaster: ToastrService
  ) {}


  item:any

  async ngOnInit() {

    await this.UpdateForm.patchValue(this.userService.GetxById);
    await this.loginService.GetAllLogin();


    let info:any=await localStorage.getItem('user');
    this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);

   await this.UpdateForm.patchValue(this.item.userinfo);



  }


  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.userService.UploadImage(formData)
      this.UpdateForm.controls.image.setValue(this.userService.imageName)

      }
      }
    }

  async UpdateUser() {
    console.log(this.UpdateForm.value);

    await this.userService.Update(this.UpdateForm.value);
    await this.loginService.GetAllx.forEach( (value:any) => {
      if(value.userid==this.UpdateForm.value.id){
        value.username=this.UpdateForm.value.email
        this.loginService.Update(value);

      }
    });
    await this.userService.GetUserById(this.item.id);
  }

  async ChangePassword(){


    var x= await  this.loginService.GetAllx.filter( (log: any) => log.userid==this.item.userinfo )


    if(x[0].password == this.ChangePasswordForm.controls.current.value){
      x[0].password = this.ChangePasswordForm.controls.newPassword.value
      await this.loginService.Update(x[0]);
    }
    else{
      this.toaster.error("Error")
    }
  }
}
