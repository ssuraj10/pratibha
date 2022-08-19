import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class LabCheckoutService {
    constructor(private http: HttpClient) {
    }

    createOrder(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labcheckout/order`, item);
    }
    createCart(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labcheckout/cart`, item);
    }
    createProduct(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labcheckout/product`, item);
    }
    getbyCart(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labcheckout/ByCart?userAddressId=${id}`).pipe(map(res => {
            return res;
        }));
    }
    getbyMedicalTest(MedicalTest: number,LabId:number,MedicalTestId:number) {
        return this.http.get(`${environment.apiUrl}lab/labcheckout/MedicalTest?userAddressId=${MedicalTest}&LabId=${LabId}&MedicalTestId=${MedicalTestId}`).pipe(map(res => {
            return res;
        }));
    }
    getbyOrder(userAddressId: number,orderId:number) {
        return this.http.get(`${environment.apiUrl}/lab/labcheckout/order?userAddressId=${userAddressId}&orderId=${orderId}`).pipe(map(res => {
            return res;
        }));
    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/Lab/${id}`);
    }
    update(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/Lab/${id}`, item);
    }

}
