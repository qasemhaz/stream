import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(private http: HttpClient, private route : Router, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  GetAllx:any=[]
  async GetAllCrew() {    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Crew/getall").subscribe(
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

imageName = "" // imagename

UploadImage(imageFile : any)
{

  this.http.post("https://localhost:44372/api/Crew/uploadImage",imageFile).subscribe(
    {
      next:(res:any)=>{this.imageName = res.image
      },
      error:()=>{}
    }
  )
}

GetxById: any // {}
async GetCrewById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Crew/GetById/" + id).subscribe(
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

async Update(Crew : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Crew/Update", Crew).subscribe(
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

async insert(Crew : any)
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Crew/Create",Crew).subscribe(
      {
        next:()=>{
          resolve();  this.spinner.hide();   this.toaster.success("Success")
        },
        error:()=>{ this.spinner.hide();   this.toaster.error("Error")
        }
      }
    )
})
}

async Delete(id : number)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.delete("https://localhost:44372/api/Crew/Delete/"+id).subscribe(
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
}
