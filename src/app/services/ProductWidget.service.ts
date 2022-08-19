import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductWidgetsService {

    constructor(
        private http: HttpClient
    ) { }

    getAll(id): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}` +  `/menu.php?cat=${id}`).pipe(map(res => {
            return res.data;
        }));
    }
    getSellAll(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/Home`).pipe(map(res => {
            return res.data.widgetInstances;
           
        }));
    }
    getCarouselAll(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/Home`).pipe(map(res => {
            return res.data;
        }));
    }
    getAllBrand(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/brands`).pipe(map(res => {
            return res.data;
        }));
    }

    getAllsimpleProduct(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/category.php`).pipe(map(res => {
            return res.data;
        }));
    }
    getOne(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/product/ProductViewByCategoriesId/${id}`).pipe(map(res => {
            return res.data;
        }));
    }
    getcategorieslist(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/menu.php?cat=${id}`).pipe(map(res => {
            return res.data;
        }));
    }
    getOnecategories(id: any): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/pcategory/${id}`).pipe(map(res => {
            return res.data;
        }));
    }

    getCmsBanner(): Observable<any[]> {
        return this.http.get<any>(`${environment.apiUrl}/flashsell`).pipe(map(res => {
            return res;
        }));
    }
}
