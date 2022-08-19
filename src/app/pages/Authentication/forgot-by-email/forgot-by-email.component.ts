import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { SignInState } from '../log-in/store/login.reducer';
import { Router } from '@angular/router';
import * as fromForgetResetActions from './store/forgetResetPasswordByEmail.actions';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';


@Component({
  selector: 'app-forgot-by-email',
  templateUrl: './forgot-by-email.component.html',
  styleUrls: ['../changepassword/changepassword.component.css']
})
export class ForgotByEmailComponent implements OnInit {


  forgotByEmailForm: FormGroup;
  resetByEmailForm: FormGroup;
  loading = false;
  loadingText: string;
  subscription$;
  userName: string;
  userN:string;
  getcaptchaSuccess: boolean=false;
  hide: boolean=true;
  constructor(private fb: FormBuilder,
    private localstorageforaddressService:LocalstorageforaddressService,
    private restApi: AuthService,
    private store: Store<SignInState>,
    private router: Router) {
  }

  ngOnInit() {
    this.userN = this.localstorageforaddressService.get("userName");
    console.log(this.userN);
    this.forgotByEmailForm = new FormGroup({
      userName: new FormControl('',Validators.required)
    });
    this.resetByEmailForm = this.fb.group({
      userName: this.fb.control(this.userN, [Validators.required]),
      code: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
    });
  }
  getcapthaSuccess(){

    this.getcaptchaSuccess= !this.getcaptchaSuccess;
    this.hide=!this.hide;

  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  onSubmit(forgotByEmailForm) {
    console.log(this.forgotByEmailForm.value);
    this.loading = true;
    this.loadingText = 'Sending Registration code to Email number...';

    this.store.dispatch(fromForgetResetActions.createForgetEmailRequest({ forgotPasswordByEmail: this.forgotByEmailForm.value }));
    this.getcapthaSuccess();
  }

  onregisterSubmit(resetByEmailForm) {
    console.log(this.resetByEmailForm.value.userName);
    this.loading = true;
    this.loadingText = 'Registering your password and  Email no and validating password...';
    // this.restApi.resetPasswordByEmail(resetByEmailForm.value);
     this.store.dispatch(fromForgetResetActions.CreateResetPasswordByEmail({resetPasswordByEmail: this.resetByEmailForm.value.userName}));
  }





}
