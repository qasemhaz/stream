import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private route : Router, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  GetAllx:any=[]
  async GetAllLogin() {    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Login/getall").subscribe(
    {
      next: (res) => {
        this.GetAllx = res;  this.spinner.hide()
        resolve()
      },
      error: (err) => {
        console.log(err);  this.spinner.hide()
        reject()
      }
    }
  )

 })
}

GetxById: any // {}
async GetLoginById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Login/GetById/"+id).subscribe(
      {
        next: (res) => {
          this.GetxById = res;  this.spinner.hide()
          resolve()
        },

        error: (err) => {
          console.log(err);  this.spinner.hide()
        }
      }
    )

    })
}

async Update(Login : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Login/Update", Login).subscribe(
    {
      next:()=>{
        resolve();  this.spinner.hide();   this.toaster.success("Success")
      },
      error:(err)=>{
        console.log(err);  this.spinner.hide();   this.toaster.error("Error")
      }
    }
  )
})
}

async insert(Login : any)
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Login/Create",Login).subscribe(
      {
        next:()=>{
          resolve();  this.spinner.hide();   this.toaster.success("Success")
        },
        error:()=>{  this.spinner.hide();   this.toaster.error("Error")
        }
      }
    )
})
}

async Delete(id : number)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.delete("https://localhost:44372/api/Login/Delete/"+id).subscribe(
    {
      next:()=>{
        resolve();  this.spinner.hide();   this.toaster.success("Success")
      },
      error:()=>{
        reject();  this.spinner.hide();   this.toaster.error("Error")
      }
    }
  )
})
}

async login(Login : any) // coursename , categortid
{    this.spinner.show()


 const header = {
   'Content-Type' : 'application/json',
   'Accept' : 'application/json'
 }

 const Options ={
   headers: new HttpHeaders(header)
 }
return new Promise<void>((resolve, reject) => {

  this.http.post("https://localhost:44372/api/Login/Auth",Login,Options).subscribe(
    {
      next:(res:any)=>{

         var data:any = jwt_decode(res);

          localStorage.setItem('token' , res)
          localStorage.setItem('user' ,JSON.stringify(data))

         if(data.role == 1){
          this.route.navigate(["admin"])
        }
        else if(data.role==3){this.route.navigate(['user'])}
        else{this.route.navigate([''])}
resolve();  this.spinner.hide();   this.toaster.success("Success")
      },
      error:()=>{  this.spinner.hide();   this.toaster.error("Error")

      }
    }
  )
})
}


async google()
{    this.spinner.show()


  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/login/google-login").subscribe(
      {
        next:()=>{
          resolve();  this.spinner.hide();   this.toaster.success("Success")
        },
        error:(err)=>{
          console.log(err);  this.spinner.hide();   this.toaster.error("Error")

        }
      }
    )
})
}
}
