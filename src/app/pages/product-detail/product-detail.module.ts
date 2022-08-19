import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductDetailComponent } from './product-detail.component';
import { productDetailReducer } from './state/productdetail.reducer';
import { ProductDetailEffects } from './state/productdetail.effects';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as fromSimpleProductWidget from '../homebody/store/simpleProductWidget.reducer';
import { SimpleProductWidgetEffects } from '../homebody/store/simpleProductWidget.effects';
import { ProductReviewComponent } from './product-review/product-review.component';
import { RelatedProductComponent } from './RelatedProduct/related-product/related-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { ShareModule } from 'ngx-sharebuttons';


const routes: Routes = [
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    ShareButtonModule,
    ShareIconsModule,
    AppRoutingModule,
    NgxImageZoomModule,
    NgbModule,
    NgxImageZoomModule,
    CarouselModule,
    
    RouterModule.forChild(routes),
    
    // StoreModule.forFeature('productdetail', productDetailReducer),
    // EffectsModule.forFeature([ProductDetailEffects])
  ],
  declarations: [
    ProductDetailComponent,
    ProductReviewComponent,
    RelatedProductComponent,
    WishlistComponent,
    ImageZoomComponent,

  ],
  exports: [
    WishlistComponent
  ],
  // providers: [ProductDetailResolverService]

})
export class ProductDetailModule {}
