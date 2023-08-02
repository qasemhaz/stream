import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private route : Router, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  GetAllCategoryv:any=[]
  async GetAllCategory() {    this.spinner.show()

 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Category/getall").subscribe(
    {
      next: (res) => {
        this.GetAllCategoryv = res
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


GetCategoryByIdv: any // {}
async GetCategoryById(id: number)//10
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Category/GetById/" + id).subscribe(
      {
        next: (res) => {
          this.GetCategoryByIdv = res;  this.spinner.hide()
          resolve()
        },

        error: (err) => {
          console.log(err);  this.spinner.hide()

        }
      }
    )

    })
}

async Update(Category : any)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Category/Update", Category).subscribe(
    {
      next:()=>{
        resolve();  this.spinner.hide()
      },
      error:(err)=>{
        console.log(err);  this.spinner.hide()
      }
    }
  )
})
}

async insert(Category : any)
{    this.spinner.show()

  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Category/Create",Category).subscribe(
      {
        next:()=>{
          resolve();  this.spinner.hide()
        },
        error:()=>{  this.spinner.hide()
        }
      }
    )
})
}

async Delete(id : number)
{    this.spinner.show()

  return new Promise<void>((resolve,reject)=>{
  this.http.delete("https://localhost:44372/api/Category/Delete/"+id).subscribe(
    {
      next:()=>{
        resolve();  this.spinner.hide()
      },
      error:()=>{
        reject();  this.spinner.hide()
      }
    }
  )
})
}
}
