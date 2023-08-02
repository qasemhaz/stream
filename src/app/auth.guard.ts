import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toaster: ToastrService , private route: Router)
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('token')
      let user:any = localStorage.getItem('user')
      user = JSON.parse(user)

      if(token)
      {
      if (state.url.includes('admin'))
      {
        if (user.role == 1)
        {
          this.toaster.success("Welcome on admin dashboard")
          return true;
        }
        else{
          this.toaster.error("This Page For Admin")
          this.route.navigate([''])
         return false;
        }
      }


      if (state.url.includes('user'))
      {
        if (user.role == 3)
        {
          this.toaster.success("Welcome")
          return true;
        }
        else{
          this.toaster.error("This Page For Premium user")
          this.route.navigate([''])
         return false;
        }
      }






        return true
      }
      else{
        this.toaster.error(" you can't access on this route")
        this.route.navigate([''])
       return false;
      }


  }

}
