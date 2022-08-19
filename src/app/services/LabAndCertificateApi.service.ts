import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class LabAndCertificateService {
    constructor(private http: HttpClient) {
    }

    create(item: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/labandcertificate`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/labandcertificate`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/labandcertificate/${id}`);
    }
    update(id: number, item: any): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/labandcertificate/${id}`, item);
    }

    getbyid(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labandcertificate/${id}`).pipe(map(res => {
            return res;
        }));
    }
    getbyLabId(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/labandcertificate/labId?labId=${id}`).pipe(map(res => {
            return res;
        }));
    }

}
