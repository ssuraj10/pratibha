import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/user-addresses`).pipe(map(res => {
      return res.data;
    }));
  }

  create(ProductDetail: any): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/user-addresses`,ProductDetail);
  }
}