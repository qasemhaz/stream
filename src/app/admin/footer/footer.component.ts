import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FooterService } from 'src/app/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  UpdateForm = new FormGroup({
    id: new FormControl(''),
    facebook: new FormControl('', Validators.required),
    twitter : new FormControl('',Validators.required),
    instagram: new FormControl('', Validators.required),
    youtube: new FormControl('', Validators.required),
    play: new FormControl('', Validators.required),
    apple: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),

  });

  constructor(public footerService: FooterService ) {}

  async ngOnInit() {

    await this.footerService.GetFooterById(1);
    this.UpdateForm.patchValue(this.footerService.GetxById);
  }

  async UpdateFo() {
    await this.footerService.Update(this.UpdateForm.value);
    await this.footerService.GetFooterById(1);
  }
}
