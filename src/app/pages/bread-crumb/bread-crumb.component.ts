import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {
  breadcrumbs: any[];
  categorypage: any;
  categoryurl: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  categoryName: string;
  ngOnInit() {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   distinctUntilChanged(),
    // ).subscribe(() => {
    //   this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute);

    // })
    // console.log(this.breadcrumbs)
    this.categoryName = this.activatedRoute.snapshot.params.name;
    this.categorypage = this.activatedRoute.snapshot.data;
    this.categoryurl = this.router.routerState.snapshot.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        let url = snapshot.url;
        let routeData = this.activatedRoute.snapshot.data;
        let label = routeData['breadcrumb'];
        let params = this.activatedRoute.snapshot.params.name;
        this.breadcrumbs.push({
          url: url,
          label: label,
          params: params
        });
      });


  }

  // buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
  //   let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
  //   let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
  //   let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
  //   console.log(label);
  //   console.log(path);
  //   const lastRoutePart = path.split('/').pop();
  //   const isDynamicRoute = lastRoutePart.startsWith(':');
  //   if(isDynamicRoute && !!route.snapshot) {
  //     const paramName = lastRoutePart.split(':')[1];
  //     path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
  //     label = route.snapshot.params[paramName];
  //   }
  //   const nextUrl = path ? `${url}/${path}` : url;

  //   const breadcrumb: any = {
  //       label: label,
  //       url: nextUrl,
  //   };
  //   const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
  //   if (route.firstChild) {
  //       return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  //   }
  //   return newBreadcrumbs;
  // }



}
