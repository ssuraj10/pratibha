import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ReviewService {


    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/product-review`).pipe(map(res => {
            return res.data;
        }));
    }
    getRatingOne(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/product-review/ProductReviewRating/${id}`).pipe(map(res => {
            return res.data;
        }));
    }
    getReviewOne(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/product-review/ProductReviewRating/${id}`).pipe(map(res => {
            return res.data;
        }));
    }
    create(item: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/product-review`, item).pipe(map(res => {
            return res;
        }));;
    }
    edit(item: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/product-review/${item.id}`, item);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/product-review/${id}`);
    }
}
