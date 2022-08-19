import { Component, OnInit, ElementRef } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TopSellingProduct } from 'src/app/models/dashboadByTsp';
import { MonthlySales } from 'src/app/models/dashboardByMs';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/models/orders';
import { AccountService } from 'src/app/services/account.service';
import { first } from 'rxjs/operators';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Reviews } from 'src/app/models/reviews';
import { WishListService } from 'src/app/services/wishlist.service';
import { UseraddressService } from 'src/app/services/useraddress.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';
import { FormGroup } from '@angular/forms';
import { CorderService } from 'src/app/services/corder.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  page = 1;
  userAdressList: any = [];
  pageSize = 4;
  wishlist: any = [];
  public isCollapsed = true;
  totalProducts: any = [];
  totalPurchase: any = [];
  reviews: any = [];
  wishlistL: any = [];
  currentRate = 5;
  purchaseItem: any = [];
  topSellingProduct: TopSellingProduct[] = [];
  monthlySales: MonthlySales[] = [];
  orders: Orders[] = [];
  viewMode;
  corders: any;
  users: any = [];
  topsellength: any;
  shippinguserid: any;
  coorderslength: any;
  constructor(public dashboardService: DashboardService, public ordersService: OrdersService,
    private corder: CorderService,
    private restApi: UseraddressService,
    private alertify: AlertifyService,
    private router: Router,
    private location: Location,
    private localstorageforaddressService: LocalstorageforaddressService,
    private accounts: AccountService, config: NgbRatingConfig, private WishlistApi: WishListService) {
    config.max = 5;
    config.readonly = true;
   
  }
  selectedAddress: any;
  public addressId: ElementRef;
  shippingUserId: any;
  getMasterForm: FormGroup;
  isdefault: boolean;
  ngOnInit(): void {
    this.getalluser();
    this.getwishlist();
    this.getCorder();
    this.getAddress();

    this.getTotalPurchases();
    this.getallreviews();
    this.dashboardService.getTotalProducts().subscribe((data: any) => {
    
      this.totalProducts = data;
    });
    this.dashboardService.getTopSellingProducts().subscribe((data: any) => {
     
      this.topSellingProduct = data;
      this.topsellength = data.length;
    });
    this.dashboardService.getMonthlySales().subscribe((data: any) => {
     
      this.monthlySales = data;
    });
    this.ordersService.getAll().subscribe((data: any) => {
    
      this.orders = data;
    });
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

  getAddressbyid(AddressId: number) {
    return this.restApi.getOne(AddressId)
      .subscribe(data => {
      });
  }

  delet(id) {
    console.log(id);
    this.restApi.delete(id).subscribe(data => {
      this.getAddress();
    });
  }
  onItemChange(value) {
    this.shippinguserid = value;
  }

  get Totalwishlist(): number {
    return this.wishlist.length;
  }
  get ntotalSellingProducts(): number {
    return this.totalPurchase.length;
  }
  get totalPrice() {
    let total = 0;
    for (const data of this.monthlySales) {
      total += data.productPrice * data.quantity;
    }
    return total;
  }
  getalluser() {
    this.accounts.getAll().pipe(first()).subscribe(data => {

      this.users = data;
    
    });
  }
  getallreviews() {
    this.dashboardService.getRatings().pipe(first()).subscribe(data => {

      this.reviews = data;
    
    });
  }
  getTotalPurchases() {
    this.dashboardService.getTotalPurchase().pipe(first()).subscribe(data => {

      this.totalPurchase = data;
      this.purchaseItem = data.item;
     
    });
  }
  deleteRatings(reviews: Reviews) {
    this.dashboardService.deleteRating(reviews.id).subscribe(data => {
      this.reviews = this.reviews.filter(u => u !== reviews);
    });
  }
  delete(id: number) {
    const conf = confirm('Are you sure you want to delete?');
    if (conf === true) {
      this.dashboardService.deleteRating(id)
        .pipe(first())
        .subscribe(() => this.getallreviews());
      alert('Id number ' + JSON.stringify(id) + ' has been deleted !');
      window.location.reload();
    } else {
      alert('Delete unsuccesful');
    }
  }
  getwishlist() {
    this.WishlistApi.getAll().subscribe((data: any) => {
      this.wishlist = data;
      this.wishlistL = data.length;
    });
  }
  getCorder() {
    this.corder.getAll().subscribe((data: any) => {

      this.corders = data;
     
      this.coorderslength = this.corders.length;
    });
  }

  activeClass(value) {
    if (this.corders.some((data) => data.id === value)) {
      return true;
    }
  }

  isActive() {
    return ["/edit", "/my-health/my-lifestyle", "/my-health/my-family-health-history"].includes(this.router.url);
  }
  // onSwitch(event: any) {
  //   switch (event.target.value) {
  //     case "profileedit": {
  //       this.location.replaceState('/edit');
  //       break;
  //     }
  //     case "address": {
  //       this.location.replaceState('/address');
  //       break;
  //     }
  //     case "orderhistory": {
  //       this.location.replaceState('/orderhistory');
  //       break;
  //     }
  //     case "review": {
  //       this.location.replaceState('/review');
  //       break;
  //     }
  //     case "wishlist": {
  //       this.location.replaceState('/wishlist');
  //       break;
  //     }
  //     default: {
  //       this.location.replaceState('/profile');
  //       break;
  //     }
  //   }
  // }
  stock() {


  }

}
