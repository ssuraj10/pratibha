import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MonthlySales } from 'src/app/models/dashboardByMs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UseraddressService } from 'src/app/services/useraddress.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProducts: any;
  topSellingProduct: any;
  topsellength: any;
  monthlySales: MonthlySales[] = [];
  orders: any;
  totalPurchase: any;
  purchaseItem: any;
  reviews: any;
  wishlist: any;
  wishlistL: any;
  totalPurchaselength: any;

  constructor(public dashboardService: DashboardService, 
    public ordersService: OrdersService, 
    private restApi: UseraddressService,
    private WishlistApi: WishListService) { }

  ngOnInit(): void {
    this.getTotalPurchases();
    this.getallreviews();
    this.getwishlist();
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
  getTotalPurchases() {
    this.dashboardService.getTotalPurchase().pipe(first()).subscribe(data => {

      this.totalPurchase = data;
      this.totalPurchaselength=data.length;
      this.purchaseItem = data.item;
    });
  }
  getallreviews() {
    this.dashboardService.getRatings().pipe(first()).subscribe(data => {

      this.reviews = data;
     
    });
  }
  getwishlist() {
    this.WishlistApi.getAll().subscribe((data: any) => {
      this.wishlist = data;
      this.wishlistL = data.length;
    });
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
}
