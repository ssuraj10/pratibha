import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'ProductDetail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  
 
  
  {
    path: '**',
    redirectTo: 'others/404'
  }
 
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
