import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ProductDetail } from '../models/ProductDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/product`).pipe(map(res => {
      return res.data;
    }));
  }
  getcategoryAll() {
    return this.http.get<any>(`${environment.apiUrl}/categories/categories/tree`).pipe(map(res => {
      return res.data;
    }));
  }
  getproductWidgetAll() {
    return this.http.get<any>(`${environment.apiUrl}/Home`).pipe(map(res => {
      return res.data;
    }));
  }
  // getProductAll() {
  //     return this.http.get<ProductDetail[]>(`${environment.apiUrl}/products/31`);
  // }

  getProductAll(): Observable<ProductDetail[]> {
    return this.http.get<any>(`${environment.apiUrl}/product/227`).pipe(map(res => {
      return res.data;
    }));
  }

  getbyid(id: any): Observable<ProductDetail> {
     const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    };
    return this.http.get<any>(`${environment.apiUrl}/product/${id}`,httpOptions).pipe(map(res => {
      return res;
    }));
  }

  getrelatedproductbyid(id: any): Observable<ProductDetail> {
    return this.http.get<any>(`${environment.apiUrl}/product/ProductGet/${id}`).pipe(map(res => {
      return res.data;
    }));
  }
  edit(id: number, ProductDetail: any): Observable<Object> {
    return this.http.put(`${environment.apiUrl}/cart/add-item?inputId=${id}`, ProductDetail);
  }
  create(id: number, ProductDetail: any): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/cart/add-item`, id, ProductDetail);
  }
  // getAll(data: Product): Observable<Product> {
  //     return this.http.get<Product>(`${environment.apiUrl}/product-attributes`, data).pipe(
  //       mergeMap((user: Product) => {
  //         this.name = user.data.name;
  //         return of(user);
  //       })
  //     );
  //   }

  //   ProductDetailById(ProductId: number) {
  //     return this.http.get<any[]>(`${environment.apiUrl}/products/${ProductId}`);
  //   }

  //   getItem(itemId: number) {
  //     return this.http.get<any>(`${environment.apiUrl}/Item/${itemId}`);
  //   }


  //   getItemByDishId(dishId: number)  {
  //     return this.http.get<any[]>(`${environment.apiUrl}/Item/ItemViewByDishId/${dishId}`);
  //   }


}
