import { Component } from '@angular/core';
import { FooterService } from 'src/app/footer.service';

@Component({
  selector: 'app-firstfooter',
  templateUrl: './firstfooter.component.html',
  styleUrls: ['./firstfooter.component.css']
})
export class FirstfooterComponent {
  constructor(public footerService:FooterService
    )
    {}
    async ngOnInit(){

     await this.footerService.GetFooterById(1);
    }
}
