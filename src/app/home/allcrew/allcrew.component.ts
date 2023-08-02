import { Component } from '@angular/core';
import { CrewComponent } from '../crew/crew.component';
import { CrewService } from 'src/app/crew.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/role.service';

@Component({
  selector: 'app-allcrew',
  templateUrl: './allcrew.component.html',
  styleUrls: ['./allcrew.component.css']
})
export class AllcrewComponent {

  searchTerm: any;
  searchResults: any;
  constructor( private router:Router,public crewService:CrewService,public roleService:RoleService){

  }

   async ngOnInit(){
    await this.crewService.GetAllCrew();
    await this.roleService.GetAllRole();

  }
  async  Navigate(id:number){
    await this.crewService.GetCrewById(id);
      this.router.navigate(["user/crew"])

    }
    search() {
      const filterValue = this.searchTerm.trim();
    this.searchResults= this.crewService.GetAllx.filter( (mov: any) => mov.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
}
