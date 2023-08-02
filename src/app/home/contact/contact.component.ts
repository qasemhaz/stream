import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import { FooterService } from 'src/app/footer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('createmessage') Create: any;

  CreateForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),

  });
  constructor(public contactService: ContactService,public footerService: FooterService) {}
  async ngOnInit() {
    await this.footerService.GetAllFooter();
  }

  async CreateMsg() {
    await this.contactService.insert(this.CreateForm.value);
  }
}
