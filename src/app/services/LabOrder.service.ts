import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class LabOrderService {
    constructor(private http: HttpClient) {
    }

    create(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labOrders`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/labOrders`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/labOrders/${id}`);
    }
    update(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/labOrders/${id}`, item);
    }
    Cancel(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/labOrders/${id}/cancel`, item);
    }
    onHold(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/labOrders/${id}/on-hold`, item);
    }

    getbylabOrder(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labOrders/${id}`).pipe(map(res => {
            return res;
        }));
    }
    getbycustomer(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labOrders/CustomerOrder/${id}`).pipe(map(res => {
            return res;
        }));
    }
    getbyOrdersNo(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labOrders/${id}/no`).pipe(map(res => {
            return res;
        }));
    }

}
