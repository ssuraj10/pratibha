
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestCategory } from '../models/TestCategory';


@Injectable({
    providedIn: 'root'
})

export class TestCategoryService {
    constructor(private http: HttpClient) {
    }

    create(item: TestCategory): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lab/testcategory`, item);
    }
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/lab/testcategory`).pipe(map(res => {
            return res.data;
        }));

    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/lab/testcategory/${id}`);
    }
    update(id: number, item: TestCategory): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/lab/testcategory/${id}`, item);
    }

    getbyid(id: number) {
        return this.http.get(`${environment.apiUrl}/lab/testcategory/${id}`).pipe(map(res => {
            return res;
        }));
    }

}
