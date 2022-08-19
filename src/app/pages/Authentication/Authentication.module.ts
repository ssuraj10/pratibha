import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './Authentication.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromSignin from './log-in/store/login.reducer';
import * as fromSignup from './signup/store/sinup.reducer';
import * as fromChangePassword from './changepassword/store/changePassword.reducer';
import * as fromResetByPhone from './forgot/store/resetPasswordByPhone.reducer';
import * as fromforgetByPhone from './forgot/store/forgetPasswordByPhone.reducer';
import * as fromResetByEmail from './forgot-by-email/store/resetPasswordByEmail.reducer';
import * as fromforgetByEmail from './forgot-by-email/store/forgetPasswordByEmail.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SignInComponent } from './signup/sign-in.component';
import { SignInEffects } from './log-in/store/login.effects';
import { SignupEffects } from './signup/store/sinup.effects';
import { ChangePasswordEffects } from './changepassword/store/changePassword.effects';
import { ForgetResetByEmailEffects } from './forgot-by-email/store/forgetResetPasswordByEmail.effects';
import { forgetPasswordByPhoneFeatureKey } from './forgot/store/forgetPasswordByPhone.reducer';
import { ForgetResetByPhoneEffects } from './forgot/store/forgetResetPasswordByPhone.effects';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ForgotByEmailComponent } from './forgot-by-email/forgot-by-email.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromSignup.signupsFeatureKey, fromSignup.SinupReducer),
    StoreModule.forFeature('signIn', fromSignin.signInReducer),
    StoreModule.forFeature('changePassword', fromChangePassword.changePasswordReducer),
    StoreModule.forFeature('resetByPhone', fromResetByPhone.ResetByPhoneReducer),
    StoreModule.forFeature('forgetByPhone', fromforgetByPhone.ForgetByPhoneReducer),
    StoreModule.forFeature('resetByEmail', fromResetByEmail.ResetByEmailReducer),
    StoreModule.forFeature('forgetByEmail', fromforgetByEmail.ForgetByEmailReducer),
    EffectsModule.forFeature([SignInEffects,SignupEffects,ChangePasswordEffects,ForgetResetByEmailEffects,ForgetResetByPhoneEffects]),
  ],
  declarations: [
    AuthenticationComponent,
    SignInComponent,
    LogInComponent,
    ChangepasswordComponent,
    ForgotComponent,
    ForgotByEmailComponent
  ]
})
export class AuthenticationModule { }
