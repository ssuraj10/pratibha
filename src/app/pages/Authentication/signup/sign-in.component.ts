import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser, LoginUser } from 'src/app/Store/Action/auth.actions';
import { AuthType } from 'src/app/models/auth';
import { createSignup } from './store/sinup.actions';
import { Signup } from './store/sinup.model';
import { AppState } from 'src/app/app.reducer';
import * as fromSignUpActions from './store/sinup.actions';
import { SignInState } from '../log-in/store/login.reducer';
import { Store } from '@ngrx/store';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../changepassword/changepassword.component.css']
})
export class SignInComponent implements OnInit {
  sinupForm: FormGroup;
  reisterForm: FormGroup;
  loading = false;
  loadingText: string;
  getcaptchaSuccess: boolean=false;
  hide: boolean=true;
  subscription$;
  phonevalue: any;
  constructor(private fb: FormBuilder,
    private store: Store<SignInState>,
    private router: Router,
    private localstorageforaddressService:LocalstorageforaddressService,
    ) {
  }

  ngOnInit() {
    this.sinupForm = this.fb.group({
      phone: this.fb.control('', [Validators.required])
    });
    this.reisterForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      password_confirmation: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required])
    });
  }



  onSubmit(sinupForm) {
    console.log(sinupForm.value);
    this.loading = true;
    this.loadingText = 'Sending Registration code to phone number...';
    this.phonevalue=this.sinupForm.value.phone;
    console.log(this.phonevalue);
    // this.store.dispatch(fromSignUpActions.createSignup({ signup: this.sinupForm.value }));
    this.getcapthaSuccess();
   
   
  }

  onregisterSubmit(reisterForm) {
    this.reisterForm.value.phoneno=this.phonevalue;
    console.log(reisterForm.value);
    const val = this.reisterForm.getRawValue();
    this.loading = true;
    this.loadingText = 'Registering your password and  phone no and validating password...';
    this.store.dispatch(fromSignUpActions.addSignup({ signup: this.reisterForm.value }));
   
  }




  getcapthaSuccess(){

    this.getcaptchaSuccess= !this.getcaptchaSuccess;
    this.hide=!this.hide;

  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  // auth(authType: AuthType = 'register-verify-phone') {
  //   console.log(this.sinupForm)
  //   const authActionread = {
  //     login: LoginUser,
  //     register: RegisterUser
  //   };
  //   const val = this.sinupForm.getRawValue();
  //   console.log(val)

  //   this.store.dispatch(new authActionread[authType](val));
  //   this.subscription$ = this.store
  //     .select(state => state.auth)
  //     .subscribe(val => {
  //       this.loading = val.loading;
  //       this.router.navigate(['/login']);

  //     });
  // }

}
