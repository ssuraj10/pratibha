import { ProductService } from '../product.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { ProductWidgetsService } from '../ProductWidget.service';

@Injectable({
    providedIn: 'root'
  })
export class CategoryResolverService implements Resolve<any>{
    constructor(private widgetService: ProductWidgetsService,
        private router: Router,) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let Id = route.paramMap.get('id');
        console.log(Id)
        return this.widgetService.getOnecategories(Id);

         
    }
    
}