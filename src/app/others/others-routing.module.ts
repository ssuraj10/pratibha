import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';



const routes: Routes = [
  {
      path: '404',
      component: PagenotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
