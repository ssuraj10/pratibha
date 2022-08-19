import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class LabTestBuyService {
    constructor(private http: HttpClient) {
    }

    create(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labtestbuytogether`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/labtestbuytogether`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/labtestbuytogether/${id}`);
    }
    update(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/labtestbuytogether/${id}`, item);
    }

    getbyid(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labtestbuytogether/${id}`).pipe(map(res => {
            return res;
        }));
    }

}
