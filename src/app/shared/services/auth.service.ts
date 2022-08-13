import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: "root",
  })
  export class AuthService {
    constructor(private http: HttpClient) { }

    rootURL = 'http://67.205.165.41/ofos/api';

    login(data){
        return this.http.post(this.rootURL + '/auth.php', data);
        
    }
    registration(data:any){
       return this.http.post(this.rootURL + '/register.php', data)
        
    }
  }
