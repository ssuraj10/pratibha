import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CorderService } from '../corder.service';


@Injectable()
export class OrderByIdResolver implements Resolve<Observable<any>> {
  constructor(private orderService: CorderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.orderService.getbyid(route.paramMap.get('id'));
  }
}
