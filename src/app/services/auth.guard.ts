import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthService,
  ) { }

  canActivate() {
    const loginStatus = this.authenticationService.currentLoginStatus;
    if (loginStatus === true) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
