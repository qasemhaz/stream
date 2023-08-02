import { Component } from '@angular/core';
import { FooterService } from 'src/app/footer.service';

@Component({
  selector: 'app-homefooter',
  templateUrl: './homefooter.component.html',
  styleUrls: ['./homefooter.component.css']
})
export class HomefooterComponent {
  constructor(public footerService:FooterService
    )
    {}
    async ngOnInit(){

     await this.footerService.GetFooterById(1);
    }
}
