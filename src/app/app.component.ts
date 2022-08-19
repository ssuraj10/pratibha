import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
import { AppState } from './Store';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { SetInitialUser } from './Store/Action/auth.actions';
import swal from 'sweetalert2';
import { AlertifyService } from './services/alertify.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router, Event, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuService } from './services/menu.service';
import { FacebookSdkHelper } from './helpers/facebook-sdk.helper';
import { TwitterSdkHelper } from './helpers/twitter-sdk.helper';
import * as firebase from 'firebase/app';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';




const config = {
  apiKey: 'AIzaSyD4j041Mr-EFMA_8sQfmmjhPB78HFZq1Kg',
  databaseURL: 'https://angularchat-849bc.firebaseio.com'
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medicalPro';
  showLoadingIndicator = true;
  mySubscription: any;
  headertwo = true;
  
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private _router: Router, private menuService: MenuService,
    private facebookSdkHelper: FacebookSdkHelper, private twitterSdkHelper: TwitterSdkHelper

  ) {
    firebase.initializeApp(config);
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }

    });
    this.facebookSdkHelper.loadSdk();
    this.twitterSdkHelper.loadSdk();
  }
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.router.navigated = false;
      }
      

    })
    
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   if (event.keyCode === 50) {
  //     this.headertwo = true;
  //   }
  //   if (event.keyCode === 49) {
  //     this.headertwo = false;
  //   }
  // }

}
