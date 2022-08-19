import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PagenotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    OthersRoutingModule
  ]
})
export class OthersModule { }
