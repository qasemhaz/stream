import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @ViewChild('deletecategory') Delete: any;
  constructor(public contactService: ContactService,    public dialog: MatDialog    ) {}

  async ngOnInit() {
    await this.contactService.GetAllContact();
  }
  selectedItem = 0;
  OpenDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }

  async DeleteMsg() {
    await this.contactService.Delete(this.selectedItem);
    this.contactService.GetAllContact();
  }
}
