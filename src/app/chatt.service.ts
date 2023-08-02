import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChattService {

  constructor(private http: HttpClient, private route : Router) { }

  GetAllx:any=[]
  async GetAllChat() {
 return new Promise<void>((resolve,reject)=>{
  this.http.get("https://localhost:44372/api/Chat/getall").subscribe(
    {
      next: (res) => {
        this.GetAllx = res
        resolve()
      },
      error: (err) => {
        console.log(err)
        reject()
      }
    }
  )

 })
}


GetxByIdv: any // {}
async GetChatByIdv(id: number)//10
{
  return new Promise<void>((resolve, reject) => {
    this.http.get("https://localhost:44372/api/Chat/GetById/" + id).subscribe(
      {
        next: (res) => {
          this.GetxByIdv = res
          resolve()
        },

        error: (err) => {
          console.log(err)
        }
      }
    )

    })
}

async Update(Chat : any)
{
  return new Promise<void>((resolve,reject)=>{
  this.http.put("https://localhost:44372/api/Chat/Update", Chat).subscribe(
    {
      next:()=>{
        resolve()
      },
      error:(err)=>{
        console.log(err);
      }
    }
  )
})
}

async insert(Chat : any)
{
  return new Promise<void>((resolve, reject) => {
    this.http.post("https://localhost:44372/api/Chat/Create",Chat).subscribe(
      {
        next:()=>{
          resolve();
        },
        error:()=>{
        }
      }
    )
})
}

async Delete(id : number)
{
  return new Promise<void>((resolve,reject)=>{
  this.http.delete("https://localhost:44372/api/Chat/Delete/"+id).subscribe(
    {
      next:()=>{
        resolve()
      },
      error:()=>{
        reject()
      }
    }
  )
})
}
}
