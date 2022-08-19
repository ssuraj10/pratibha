import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    constructor(public http: HttpClient) {
        console.log('Hello AuthService Provider');
    }

    socialSignUp(credentials, type) {
        // return new Promise((resolve, reject) => {
        //   const headers = new HttpHeaders();
        //   this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers })
        //     .subscribe(res => {
        //       resolve(res);
        //     }, (err) => {
        //       reject(err);
        //     });
        // });
        if (type == 'signup') {
            if (credentials.provider == 'facebook') {
                return this.http.post(`${environment.apiUrl}/Client/Facebook`, credentials);
            }
        }
    }
}
