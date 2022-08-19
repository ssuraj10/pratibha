import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/country`).pipe(map(res => {
      return res;
    }));
  }
  getAllcity() {
    return this.http.get<any>(`${environment.apiUrl}/city`).pipe(map(res => {
      return res;
    }));
  }
  getAlldistrict() {
    return this.http.get<any>(`${environment.apiUrl}/district`).pipe(map(res => {
      return res;
    }));
  }
  // getProductAll() {
  //     return this.http.get<ProductDetail[]>(`${environment.apiUrl}/products/31`);
  // }

  getProvincesByCountryId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/country/provinces/tree/${id}`).pipe(map(res => {
      return res.data;
    }));
  }

  getOneCountryValue(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/country/provinces/${id}`).pipe(map(res => {
      return res.data;
    }));
  } 
  getOneProvinceTreeByCountryIdAndKey(countryId: number, key: number) {
    return this.http.get<any>(`${environment.apiUrl}/country/provinces/trees/${countryId}?key=${key}`).pipe(map(res => {
      return res.data;
    }));
  }

  getbyid(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products/${id}`).pipe(map(res => {
      return res.data;
    }));
  }

}
