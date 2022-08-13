import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IMAGE_URL, LOGO } from '../shared/constant/url';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  LOGO = LOGO
  IMAGE_URL = IMAGE_URL;
  signUpForm: FormGroup;
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      firstname: ['', [Validators.required ,]],
      lastname: ['', [Validators.required ]],
      address: ['', [Validators.required ]],
      email: ['', [Validators.required,Validators.email ]],
      password: ['', [Validators.required ]],
     
    
      }
  );
  }

  signUp(): void
    {
      console.log(this.signUpForm.value)
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

 
      

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                    // Navigate to the Login  page
                    this._router.navigateByUrl('/login');
                },
                (error) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                   
                }
            );
    }

}
