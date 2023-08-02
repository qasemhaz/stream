import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  constructor(private http: HttpClient, private route : Router, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  GetAllx:any=[]
  async GetAllSource() {    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Source/getall").subscribe(
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

videoName = ""

UploadVideo(videoFile : any)
{

  this.http.post("https://localhost:44372/api/Source/uploadvideo",videoFile).subscribe(
    {
      next:(res:any)=>{this.videoName = res.video
      },
      error:()=>{}
    }
  )
}

GetxById: any // {}
async GetSourceById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Source/GetById/" + id).subscribe(
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

async Update(Source : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Source/Update", Source).subscribe(
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

async insert(Source : any)
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Source/Create",Source).subscribe(
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
  this.http.delete("https://localhost:44372/api/Source/Delete/"+id).subscribe(
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
