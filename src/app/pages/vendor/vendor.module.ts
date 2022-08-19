import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorHeaderComponent } from './vendor-header/vendor-header.component';
import { VendorComponent } from './vendor.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [ VendorComponent],
  imports: [
    CommonModule,
    CarouselModule 
  ]
  ,
  exports : []
})
export class VendorModule { }
