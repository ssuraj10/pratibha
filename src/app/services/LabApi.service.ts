import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class LabApiService {
    constructor(private http: HttpClient) {
    }

    create(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/Lab`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/Lab`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/Lab/${id}`);
    }
    update(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/Lab/${id}`, item);
    }

    getbyid(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/Lab/${id}`).pipe(map(res => {
            return res;
        }));
    }

}
