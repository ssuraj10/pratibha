import { Component, OnInit } from '@angular/core';
import { UseraddressService } from 'src/app/services/useraddress.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
  userAdressList: any;
  isdefault: any;
  shippingUserId: any;

  constructor(private restApi: UseraddressService) { }

  ngOnInit(): void {
    this.getAddress();
  }
  getAddress() {
    this.restApi.getAll().subscribe((data: any) => {
      this.userAdressList = data;
      this.userAdressList.forEach(element => {
        if (element.isDefault === true) {
          this.isdefault = element.isDefault;
          this.shippingUserId = element.userAddressId;
        }
      });

    });
  }
}
