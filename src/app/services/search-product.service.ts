import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  constructor(private http: HttpClient) { }

  // searchProduct(productQuery: string) {
  //   return this.http.get<any>(`http://139.5.72.27:7878/api/product/ProductSearch/${productQuery}`,{observe: 'response'});
  // }
  searchProduct(name: any): Observable<any> {
    
    return this.http.get<any>(`${environment.apiUrl}/search.php?search=${name}`, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        // "access-control-allow-origin": ""
        "Access-Control-Allow-Headers": "*",
        Accept: "*/*",
        Authorization: "Basic " + 'VVNFUjE6VXNlcjEyMw==',
      },
    }).pipe(map(res => {
      return res;
    }));
  }


}
