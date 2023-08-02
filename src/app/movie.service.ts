import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private route : Router, private toaster: ToastrService) { }

  GetAllx:any=[]
  async GetAllMovie() {
    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Movie/getall").subscribe(
    {
      next: (res) => {
        this.GetAllx = res
        resolve()
        this.spinner.hide()

      },
      error: (err) => {
        console.log(err)
        reject()
        this.spinner.hide()

      }
    }
  )

 })
}

imageName = "" // imagename

UploadImage(imageFile : any)
{
  this.spinner.show()

  this.http.post("https://localhost:44372/api/Movie/uploadImage",imageFile).subscribe(
    {
      next:(res:any)=>{this.imageName = res.image
        this.spinner.hide()

      },
      error:()=>{          this.spinner.hide()
      }
    }
  )
}

GetxById: any // {}
async GetMovieById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Movie/GetById/"+id).subscribe(
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

async Update(Movie : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Movie/Update", Movie).subscribe(
    {
      next:()=>{
        resolve()
             this.spinner.hide();   this.toaster.success("Success")

      },
      error:(err)=>{
        console.log(err);          this.spinner.hide();   this.toaster.error("Error")

      }
    }
  )
})
}

async insert(Movie : any)
{
  this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Movie/Create",Movie).subscribe(
      {
        next:()=>{
          resolve();
          this.spinner.hide();   this.toaster.success("Success")

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
  this.http.delete("https://localhost:44372/api/Movie/Delete/"+id).subscribe(
    {
      next:()=>{
        resolve()
        this.spinner.hide();   this.toaster.success("Success")

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
