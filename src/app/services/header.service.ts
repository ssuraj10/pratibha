import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/pcategory`).pipe(map(res => {
      return res.data;
    }));
}

  }
