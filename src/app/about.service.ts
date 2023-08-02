import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient , private route : Router, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  GetAllx:any=[]
  async GetAllAbout() {
    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/About/getall").subscribe(
    {
      next: (res) => {
        this.GetAllx = res
        this.spinner.hide()

        resolve()
      },
      error: (err) => {
        console.log(err)
        this.spinner.hide()

        reject()
      }
    }
  )

 })
}


GetxById: any // {}
async GetAboutById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/About/GetById/" + id).subscribe(
      {
        next: (res) => {
          this.GetxById = res
          resolve()
          this.spinner.hide()

        },

        error: (err) => {
          console.log(err)
          this.spinner.hide()

        }
      }
    )

    })
}

async Update(About : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/About/Update", About).subscribe(
    {
      next:()=>{
        resolve()
        this.spinner.hide()
        this.toaster.success("Success")

      },
      error:(err)=>{
        console.log(err);
        this.spinner.hide();   this.toaster.error("Error")

      }
    }
  )
})
}

async insert(About : any)
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/About/Create",About).subscribe(
      {
        next:()=>{
          resolve();
          this.spinner.hide()
          this.toaster.success("Success")

        },
        error:()=>{
          this.spinner.hide();   this.toaster.error("Error")

        }
      }
    )
})
}

async Delete(id : number)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.delete("https://localhost:44372/api/About/Delete/"+id).subscribe(
    {
      next:()=>{
        resolve()
        this.spinner.hide()
        this.toaster.success("Success")

      },
      error:()=>{
        reject()
        this.spinner.hide();   this.toaster.error("Error")

      }
    }
  )
})
}
}
