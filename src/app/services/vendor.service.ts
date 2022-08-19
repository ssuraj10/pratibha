import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class VendorService {


    constructor(
        private http: HttpClient
    ) { }
    getOne(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/product/VendorProduct/${id}`).pipe(map(res => {
            return res.data;
        }));
    }
}
