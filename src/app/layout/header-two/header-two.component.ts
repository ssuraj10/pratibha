import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { SearchProductService } from 'src/app/services/search-product.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { CompareService } from 'src/app/services/compare.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { SocialAuthService } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.css']
})
export class HeaderTwoComponent implements OnInit {
  HeaderItem: any;
  cartitem: any;
  cartItemlength: any;
  show: boolean;
  autocompleteData: any;
  queryField: FormControl = new FormControl();
  results: any[] = [];
  resultslen: any;
  loginStatus: any;
  users: any;
  emailuser: any;
  titleShow: boolean;
  navbarshow: boolean = false;
  navbarshow2: boolean = false;
  userid: string;


  constructor(
    public authService: AuthService,
    private cartapi: CartService,
    private dropdownApi: HeaderService,
    private _searchService: SearchProductService,
    private detailToCart: DetailToCartService,
    private detailoFcompare: CompareService,
    private accounts: AccountService,
    private localStore: LocalStoreService,
    private socialauthService: SocialAuthService,
    private router: Router,

  ) {
    this.loginStatus = this.localStore.getItem('loginStatus');
    this.emailuser = this.localStore.getItem('emailuser');
    this.userid=localStorage.getItem('userId');

  }

  ngOnInit(): void {
    this.loadAllHeader();
    this.getalluser();
    this.loadcartitem(this.userid);
    
     this.detailToCart.itemChanged.subscribe((data: any) => {
   
      
      this.cartitem = data;
      if (this.cartitem) {
        this.cartItemlength = this.cartitem.length;
      } else {
        this.cartItemlength = 0;
      }
    });
  }
  loadcartitem(userid) {
 
      this.cartitem=this.detailToCart.cartItems;
      this.cartItemlength=this.detailToCart.cartItems.length;
    
  }

  loadAllHeader() {
    this.dropdownApi.getAll().subscribe(result => {
      this.HeaderItem = result;
     
    });
    
    this.queryField.valueChanges.pipe
      (debounceTime(100), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this._searchService.searchProduct(query)
            .subscribe(result => {
              if (result.code == 1 && query) {
                this.results = result.data;
                this.resultslen = result.data.length;

              }
            }
            )
        } else {
          this.results = null;
          this.show = false;
        }
      });
  }
  open() {
    this.show = true;

  }

  AutoCompleteSearch(event) {
    console.log(event)
    this.autocompleteData = event;
    let itemDAta: any;
    this.show = false;
    this.results.forEach(item => {
      if (event == item.product_name) {
        // if (item.type == "category") {
        //   let urlPath = `/category/${item.name}/${item.id}`;
        //   this.router.navigate([urlPath]);
        // }
        // if (item.type == "product") {

        // }
        // if (item.type == "page") {

        // }
        let urlPath = `/productdetail/${item.product_name}/${item.id}`;
        this.router.navigate([urlPath]);
        this.show = false;
      }

    })
    this.show = false;
  }
  @HostListener('document:click', ['$event']) clickout(event) {
    if (event.target.id !== "keyword") {
      this.show = false;
    }

  }

  logout() {
    this.authService.signout();

  }
  getalluser() {
    this.users = this.accounts.getAll();
  }
  sidenavbar() {
    this.navbarshow = true;
    this.navbarshow2 = false;
  }

  sidebar2() {
    this.navbarshow = true;
    this.navbarshow2 = true;
  }
  backsidebar() {
    this.navbarshow2 = false;
  }

}
