import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserAddress } from '../pages/delivery-address/store/delivery-address.model';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UseraddressService {

 
  constructor(
    private http: HttpClient
) { }

getAll(): Observable<UserAddress[]> {
    return this.http.get<any>(`${environment.apiUrl}/user-addresses`).pipe(map(res => {
        return res.data;
    }));
}
getOne(id: number): Observable<UserAddress> {
    return this.http.get<any>(`${environment.apiUrl}/useradressdetail/${id}`).pipe(map(res => {
        return res;
    }));
}
create(item: any): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
        }),
        params: item
      };
    return this.http.post<any>(`${environment.apiUrl}/user-addresses`, null,httpOptions).pipe(map(res => {
      console.log(res);
      return res;
  }));;
}
edit(id: number,item: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/user-addresses/${id}`, item);
}
delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/user-addresses/${id}`);
}
}
