import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/category.service';
import { LoginService } from 'src/app/login.service';
import { PricingService } from 'src/app/pricing.service';
import { PricinguserService } from 'src/app/pricinguser.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  public payPalConfig?: IPayPalConfig;
  showSuccess: any;


  @ViewChild('payment') Payment: any;

  modalRef:MdbModalRef<ViewChild>|any;

  constructor(public dialog: MatDialog,private toastr: ToastrService,private modalService: MdbModalService,
     private router:Router,public categoryService: CategoryService,public pricingService: PricingService,
     public pricinguserService: PricinguserService,private loginService:LoginService,public userService: UserService)
    {

    }
    item:any


  async ngOnInit() {
    await this.pricingService.GetAllPricing();
    await this.pricinguserService.GetAllPricinguser();
    await this.loginService.GetAllLogin();
    let info:any=await localStorage.getItem('user');
    this.item=await JSON.parse(info);
   await this.userService.GetUserById(this.item.userinfo);
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });

      const currentDate = Date.now();
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() +this.pricingService.GetxById.periodd);

    console.log(this.userService.GetxById.id);

      var x={
      userid:this.userService.GetxById.id,
      planid:this.pricingService.GetxById.id,
      activedate:endDate}



      this.pricinguserService.insert(x)

      var userinformation = this.loginService.GetAllx.filter( (log: any) => log.userid==this.userService.GetxById.id )
      userinformation[0].roleid=3



      this.loginService.Update(userinformation[0])



      this.router.navigate(["auth/login"])
      this.modalRef.close()

    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }



  async openModal(id: number) {
    this.toastr.warning('if you have any issue Please Login again!')
    await this.pricingService.GetPricingById(id);
    this.modalRef = this.modalService.open(this.Payment, {
      modalClass: 'modal-xl'
     })




  }

}
