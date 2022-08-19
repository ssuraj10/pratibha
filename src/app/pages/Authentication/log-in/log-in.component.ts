import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/Store';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { AuthType } from 'src/app/models/auth';
import { LoginUser, RegisterUser } from 'src/app/Store/Action/auth.actions';
import { SignInState } from './store/login.reducer';
import { take } from 'rxjs/operators';
import * as fromSignInActions from './store/login.actions';
import * as fromSignIn from './store/login.reducer';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  showPassword: boolean = false;
  authForm: FormGroup;
  loading = false;
  subscription$;
  loadingText: string;
  loginForm: FormGroup;
  message: any;
  loginStatus: boolean;
  user: SocialUser;
  constructor(private fb: FormBuilder,
    private store: Store<SignInState>,
    private router: Router,
    private localStore: LocalStoreService,
    private authService: SocialAuthService) {
    this.loginStatus = this.localStore.getItem('loginStatus');
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Loading  Module...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
      this.localStore.setItem('currentUser', user.authToken);
      this.localStore.setItem('emailuser', user.name);
      this.localStore.setItem('loginStatus', true);
      this.router.navigateByUrl('/');

    });
  }


  signin() {
    this.loading = true;
    this.loadingText = 'Sigining in...';
    this.store.dispatch(new fromSignInActions.CreateSignIn(this.loginForm.value));
    this.loading = false;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  gotoForgetPassword(){
    this.router.navigate(['/forgotPassword']);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  //   this.authForm = this.fb.group({
  //     name: this.fb.control('', [Validators.required]),
  //     password: this.fb.control('', [Validators.required])
  //   });
  // }
  // auth(authType: AuthType = 'login') {
  //   const authActionread = {
  //     login: LoginUser,
  //     register: RegisterUser
  //   };
  //   const val = this.authForm.getRawValue();
  //   this.store.dispatch(new authActionread[authType](val));
  //   this.subscription$ = this.store
  //     .select(state => state.auth)
  //     .subscribe(val => {
  //       this.loading = val.loading;
  //       if ( val.loaded) {
  //         this.router.navigate(['/category']);
  //       }
  //     });
  // }

  // get name() {
  //   return this.authForm.get('name');
  // }
  // get password() {
  //   return this.authForm.get('password');
  // }
  // toggleShowOrHide() {
  //   this.showPassword = ! this.showPassword;
  // }
}
