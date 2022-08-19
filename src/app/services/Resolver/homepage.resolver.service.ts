import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductWidgetsService } from '../ProductWidget.service';

@Injectable({
    providedIn: 'root'
  })
export class homepageResolverService implements Resolve<any>{
    constructor(private ProductWidgetsService: ProductWidgetsService,
        private router: ActivatedRoute,) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.ProductWidgetsService.getAll(1);
    }
}