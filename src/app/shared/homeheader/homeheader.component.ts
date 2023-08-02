import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeheader',
  templateUrl: './homeheader.component.html',
  styleUrls: ['./homeheader.component.css']
})
export class HomeheaderComponent {
  constructor(private route:Router){}
  logout(){
    localStorage.clear()
    localStorage.removeItem('token');
    this.route.navigate([''])
  }
}
