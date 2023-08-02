import { Component } from '@angular/core';
import { ChattService } from 'src/app/chatt.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-chhh',
  templateUrl: './chhh.component.html',
  styleUrls: ['./chhh.component.css']
})
export class ChhhComponent {
  constructor(public userService: UserService,public chattService: ChattService) { }

  async ngOnInit() {
    await this.chattService.GetAllChat();
    await this.userService.GetUserById(1);
  }
  selectedUser:any
  async Choosing(){

  let chatObj={
    sender:61,
    receiver:1,
    message:'xxxx',
  }
  console.log(chatObj);

  await this.chattService.insert(chatObj);

  await this.chattService.GetAllChat();
  }
}
