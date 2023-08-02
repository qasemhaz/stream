import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomepageService } from 'src/app/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  UpdateForm = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', Validators.required),
    namee : new FormControl('',Validators.required),
    rate: new FormControl('', Validators.required),
    duartion: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required),
    cat: new FormControl('', Validators.required),
    auth: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    actor: new FormControl('', Validators.required),

  });

  constructor(public homepageService: HomepageService ) {}

  async ngOnInit() {

    await this.homepageService.GetHomeById(1);
    this.UpdateForm.patchValue(this.homepageService.GetxById);
  }
  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.homepageService.UploadImage(formData)
      this.UpdateForm.controls.image.setValue(this.homepageService.imageName)

      }
      }
    }
  async UpdateHo() {
    await this.homepageService.Update(this.UpdateForm.value);
    await this.homepageService.GetHomeById(1);
  }
}
