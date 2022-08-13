import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { IMAGE_URL, LOGO } from '../shared/constant/url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInNgForm') signInNgForm: NgForm;
  IMAGE_URL = IMAGE_URL
  LOGO = LOGO;
  signInForm: FormGroup;
  constructor(private _authService: AuthService,private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private _router: Router,
    private _formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    // this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value)
      .subscribe(
        () => {
          this._router.navigateByUrl('./');
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});

        },
        (response) => {
          console.log(response);

          // Re-enable the form
          this.signInForm.enable();

          // Reset the form

          

          // Set the alert
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});

        

          // Show the alert
          // this.showAlert = true;
          this.ngOnInit();
        }
      );
  }

}
