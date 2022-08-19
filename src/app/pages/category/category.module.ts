import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryFilterComponent } from './filters/category-filter/category-filter.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../state/product.effects';
import { productReducer } from '../state/product.reducer';
import { BrandPipe } from 'src/app/pipes/brand.pipe';
import { PriceFilterComponent } from './filters/price-filter/price-filter.component';
import { PriceFilterPipe } from 'src/app/pipes/pricefilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipe } from 'src/app/pipes/texting.pipe';
import { DiscountfiltersPipe } from 'src/app/pipes/discountfilter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationBoxComponent } from '../pagination-box/pagination-box.component';
import { Ng5SliderModule } from 'ng5-slider';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { TimersalesEndPipe } from 'src/app/pipes/timersales-end.pipe';
import { ProductSliderDotsComponent } from './product-slider-dots/product-slider-dots.component';
import { VendorHeaderComponent } from '../vendor/vendor-header/vendor-header.component';
import { ReplacePipe } from 'src/app/pipes/replace.pipe';





@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    Ng5SliderModule,
    NgSelectModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('product', productReducer),
    // EffectsModule.forFeature([ProductEffects])

  ],
  declarations: [CategoryComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    PaginationBoxComponent,
    BrandPipe,
    PriceFilterPipe,
    FilterPipe,
    DiscountfiltersPipe,
    BreadCrumbComponent,
    TimersalesEndPipe,
    BreadCrumbComponent,
    ProductSliderDotsComponent,
    VendorHeaderComponent,
    ReplacePipe
    
    
    
  ]
})
export class CategoryModule { }
