import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, first } from 'rxjs/operators';
import { DetailToCartService } from './detail-to-cart.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus: BehaviorSubject<any>;
  private currentUser: BehaviorSubject<any>;
  cartItem: any;

  constructor(private local: LocalStoreService,
    private router: Router,
    private http: HttpClient,
    private store: LocalStoreService,
    private detailToCart: DetailToCartService,
    private cartapi: CartService
  ) {
    this.loginStatus = new BehaviorSubject<any>(this.store.getItem('loginStatus'));
    this.currentUser = new BehaviorSubject<any>(this.store.getItem('currentUser'));
  }

  public get currentLoginStatus(): any {
    return this.loginStatus.value;
  }

  public get currentUserData(): any {
    return this.currentUser.value;
  }
  getuser() {
    return of({});
  }

  signin(credentials): Observable<any> {
    let username = credentials.username;
    let password = credentials.password;
    const httpOptions = {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        // "access-control-allow-origin": ""
        "Access-Control-Allow-Headers": "*",
        Accept: "*/*",
        Authorization: "Basic " + window.btoa(username + ":" + password),
      },
    
    };
    return this.http.post<any>(`${environment.apiUrl}/auth.php`, credentials,httpOptions)
      .pipe(map(user => {
        this.loginStatus.next(user.success);
        this.currentUser.next(user.data);
        if (user.success === true) {
          this.cartItem = this.local.getItem('cartItem');
          if (this.cartItem) {
            const itemarray = [];
            for (let i = 0; i < this.cartItem.length; i++) {
              const item = {
                productId: this.cartItem[i].productId,
                quantity: this.cartItem[i].quantity
              };
              itemarray.push(item);
            }
            this.cartapi.create(itemarray)
              .pipe(first())
              .subscribe(
                data => {
                  if (data.success === true) {
                    localStorage.removeItem('cartItem');
                  }
                },
              );
          }
        }
        return user;
      }));
  }
  
  signup(signup): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
      params: signup
    };
    // return this.http.post<any>(`${environment.apiUrl}/account/register-verify-phone`, signup);
    return this.http.post<any>(`${environment.apiUrl}/register`, null,httpOptions)
      .pipe(map(user => {
        this.loginStatus.next(user.status);
        this.currentUser.next(user.data);
        if (user.status === true) {
          this.cartItem = this.local.getItem('cartItem');
          if (this.cartItem) {
            const itemarray = [];
            for (let i = 0; i < this.cartItem.length; i++) {
              const item = {
                productId: this.cartItem[i].productId,
                quantity: this.cartItem[i].quantity
              };
              itemarray.push(item);
            }
            this.cartapi.create(itemarray)
              .pipe(first())
              .subscribe(
                data => {
                  if (data.success === true) {
                    localStorage.removeItem('cartItem');
                  }
                },
              );
          }
        }
        return user;
      }));
  }
  confirmSignup(signup): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`, signup);
  }
  forgotPasswordByPhone(forgotByPhone): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/account/forgot-password-phone`, forgotByPhone);
  }
  getPhoneEmailUserNameApi(PhoneEmailUserName: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/account/forgot-password?name=${PhoneEmailUserName}`).pipe(map(res => {
      return res;
    })
    )
  }

  resetPasswordByPhone(resetByPhone): Observable<any> {
    console.log(resetByPhone);
    return this.http.put<any>(`${environment.apiUrl}/account/reset-password-phone`, resetByPhone);
  }
  forgotPasswordByEmail(forgotByEmail): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/account/forgot-password-email`, forgotByEmail);
  }
  resetPasswordByEmail(resetByEmail): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/account/reset-password-email`, resetByEmail);
  }
  changePassword(changePassword): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/account/change-password`, changePassword);
  }
  signout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneno');
    this.loginStatus.next(null);
    this.currentUser.next(null);
    this.detailToCart.afterLogout();
    this.router.navigateByUrl('/login');
  }
}




