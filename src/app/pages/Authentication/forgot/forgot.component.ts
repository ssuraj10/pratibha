import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignInState } from '../log-in/store/login.reducer';
import { Router } from '@angular/router';
import * as fromForgetResetActions from './store/forgetResetPasswordByPhone.actions';

import { AuthService } from '../../../services/auth.service';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['../changepassword/changepassword.component.css']
})
export class ForgotComponent implements OnInit {
  phoneEmailUserNameForm: FormGroup;
  forgotByPhoneForm: FormGroup;
  resetByPhoneForm: FormGroup;
  loading = false;
  loadingText: string;
  subscription$;
  phone: any;
  userN: string;
  phoneNumber:string;
  phoneEmailUserName: any;
  public show: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  public hide: boolean = true;

  constructor(private fb: FormBuilder,
    private localstorageforaddressService: LocalstorageforaddressService,
    private restApi: AuthService,
    private store: Store<SignInState>,
    private router: Router) {
  }

  ngOnInit() {
    this.phoneEmailUserNameForm = this.fb.group({
      name: this.fb.control('', [Validators.required])
    });
    this.forgotByPhoneForm = this.fb.group({
      userName: this.fb.control('', [Validators.required])
    });
    this.resetByPhoneForm = this.fb.group({
      userName: this.fb.control('', [Validators.required]),
      code: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
    });
  }
  toggle() {
    this.show = !this.show;
    this.hide= ! this.hide;
  }
  toggle2(){
    this.show2 =!this.show2;
  }
  toggle3(){
    this.show3= !this.show3;
  }
  navigateToEmailsection(){
    this.router.navigate(['/forgotPasswordByEmail']);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  getPhoneEmailUserName(phoneEmailUserNameForm) {
    console.log(phoneEmailUserNameForm.value.name);
    this.loading = true;
    this.loadingText = 'Getting UserName Email Phone Hints...';
    return this.restApi.getPhoneEmailUserNameApi(phoneEmailUserNameForm.value.name).subscribe((res: any) => {
      this.phoneEmailUserName = res;
      console.log(this.phoneEmailUserName.data.userName);
      this.localstorageforaddressService.set("userName", this.phoneEmailUserName.data.userName);
      console.log(this.phoneEmailUserName);
      console.log(this.phoneEmailUserName.data.userName);
      this.userN= this.phoneEmailUserName.data.phone
      console.log(this.phoneEmailUserName.data.phone);

    });



    // this.store.dispatch(fromForgetResetActions.createForgetPhoneRequest({ forgotPasswordByPhone: this.forgotByPhoneForm.value }));

  }




  onSubmit(forgotByPhoneForm) {
    console.log(forgotByPhoneForm.value);
    this.loading = true;
    this.loadingText = 'Sending Registration code to phone number...';

    this.store.dispatch(fromForgetResetActions.createForgetPhoneRequest({ forgotPasswordByPhone: this.forgotByPhoneForm.value }));

  }

  onregisterSubmit(resetByPhoneForm) {
    console.log(resetByPhoneForm.value);
    this.loading = true;
    this.loadingText = 'Registering your password and  phone no and validating password...';
    // this.restApi.resetPasswordByPhone(resetByPhoneForm.value);
    this.store.dispatch(fromForgetResetActions.CreateResetPasswordByPhone({ resetPasswordByPhone: this.resetByPhoneForm.value }));
  }

}
