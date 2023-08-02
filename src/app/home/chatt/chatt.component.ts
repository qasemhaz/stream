import { Component, OnInit } from '@angular/core';
import { ChattService } from 'src/app/chatt.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.css']
})
export class ChattComponent implements OnInit{


constructor(public userService: UserService,public chattService: ChattService) { }

async ngOnInit() {
  await this.chattService.GetAllChat();
  await this.userService.GetUserById(1);
}
selectedUser:any
async Choosing(){

let chatObj={
  sender:1,
  receiver:61,
  message:'mmmm',
}
console.log(chatObj);

await this.chattService.insert(chatObj);

await this.chattService.GetAllChat();
}


  // messages: string[] = [];
  // newMessage: any;

  // constructor(private chatService: UserService) { }

  // ngOnInit(): void {
  //   this.getMessages();
  // }

  // getMessages(): void {
  //   this.chatService.getMessages().subscribe(
  //     (messages: string[]) => {
  //       this.messages = messages;
  //     },
  //     (error: any) => {
  //       console.error('Error retrieving messages:', error);
  //     }
  //   );
  // }

  // sendMessage(): void {
  //   this.chatService.sendMessage(this.newMessage).subscribe(
  //     () => {
  //       this.getMessages();
  //       this.newMessage = '';
  //     },
  //     (error: any) => {
  //       console.error('Error sending message:', error);
  //     }
  //   );
  // }
}
