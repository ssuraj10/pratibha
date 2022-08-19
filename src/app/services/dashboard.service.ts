import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

    getTopSellingProducts() {
      return this.http.get<any>(`${environment.apiUrl}/Dashboard/Dashboard/TopSellingProduct`).pipe(map(res => {
        return res;
      }));
    }
    getMonthlySales() {
      return this.http.get<any>(`${environment.apiUrl}/Dashboard/Dashboard/MonthlySales`).pipe(map(res => {
        return res;
      }));
    }
    getTotalProducts() {
      return this.http.get<any>(`${environment.apiUrl}/Dashboard/Dashboard/TotalProducts`).pipe(map(res => {
        return res.data;
      }));
    }
    getTotalPurchase() {
      return this.http.get<any>(`${environment.apiUrl}/Dashboard/Dashboard/GetTotalPurchase`).pipe(map(res => {
        return res;
      }));
    }
    getRatings() {
      return this.http.get<any>(`${environment.apiUrl}/Dashboard/Dashboard/GetReviewsAndRatings`).pipe(map(res => {
        return res.data;
      }));
    }
    deleteRating(id: number): Observable<{}> {
      const url = `${environment.apiUrl}/product-review/${id}`;
      return this.http.delete(url); }
}
