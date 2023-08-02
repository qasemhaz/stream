import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AboutService } from 'src/app/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  UpdateForm = new FormGroup({
    id: new FormControl(''),
    header: new FormControl('', Validators.required),
    header2 : new FormControl('',Validators.required),
    header3: new FormControl('', Validators.required),
    par1: new FormControl('', Validators.required),
    par2: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    clint: new FormControl('', Validators.required),
  });

  constructor(public aboutService: AboutService ) {}

  async ngOnInit() {

    await this.aboutService.GetAboutById(1);
    this.UpdateForm.patchValue(this.aboutService.GetxById);
  }

  async UpdateAb() {
    await this.aboutService.Update(this.UpdateForm.value);
    await this.aboutService.GetAboutById(1);
  }

}
