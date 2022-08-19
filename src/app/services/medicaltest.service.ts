
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medicaltest } from '../models/medicalTest';


@Injectable({
    providedIn: 'root'
})

export class medicaltestService {
    constructor(private http: HttpClient) {
    }

    create(item: Medicaltest): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/medicaltest`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/medicaltest`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/medicaltest/${id}`);
    }
    update(id: number, item: Medicaltest): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/medicaltest/${id}`, item);
    }

    getbyid(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/medicaltest/${id}`).pipe(map(res => {
            return res;
        }));
    }

}
