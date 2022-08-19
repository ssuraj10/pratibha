import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignInState } from '../log-in/store/login.reducer';
import { Router } from '@angular/router';
import * as fromChangePasswordActions from './store/changePassword.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  loadingText: string;
  subscription$;
  constructor(private fb: FormBuilder,
    private restApi: AuthService,
    private store: Store<SignInState>,
    private router: Router) {
  }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),   
     });
  }



  onSubmit(changePasswordForm) {
    console.log(this.changePasswordForm.value);
    const val = this.changePasswordForm.getRawValue();
    console.log(val)
    this.loading = true;
    this.loadingText = 'Changing Password...';
    // this.restApi.changePassword(changePasswordForm.value);

    this.store.dispatch(fromChangePasswordActions.createChangePassword({ changePassword: this.changePasswordForm.value }));
 
  }
  navigateToLogin(){
    this.router.navigate(['/']);
  }
 

}

