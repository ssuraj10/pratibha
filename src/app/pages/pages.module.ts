import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserModule } from '@angular/platform-browser';
import { HomebodyComponent } from './homebody/homebody.component';
import { FeaturebrandsComponent } from './featurebrands/featurebrands.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CategoryComponent } from './category/category.component';
import { CategoryModule } from './category/category.module';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { LogInComponent } from './Authentication/log-in/log-in.component';
import { StoreModule } from '@ngrx/store';
import { Effect, EffectsModule } from '@ngrx/effects';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CartItemBlockComponent } from './checkout-page/cart-item-block/cart-item-block.component';
import { PaymentMethodBlockComponent } from './checkout-page/payment-method-block/payment-method-block.component';
import { DeliveryAddressBlockComponent } from './checkout-page/delivery-address-block/delivery-address-block.component';
import { ProductSuggestionBlockComponent } from './checkout-page/product-suggestion-block/product-suggestion-block.component';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingCartContainerComponent } from './shopping-cart/shopping-cart-container/shopping-cart-container.component';
import { ShoppingCartItemComponent } from './shopping-cart/shopping-cart-item/shopping-cart-item.component';
import * as fromSimpleProductWidget from './homebody/store/simpleProductWidget.reducer';
import * as fromDeliveryAddress from './delivery-address/store/delivery-address.reducer';
import { SimpleProductWidgetEffects } from './homebody/store/simpleProductWidget.effects';
import { SignInComponent } from './Authentication/signup/sign-in.component';
import { shoppingListReducer } from './shopping-cart/shopping-cart-item/store/shop.reducer';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { DeliveryAddressEffects } from './delivery-address/store/delivery-address.effects';
import { AddressFormComponent } from './delivery-address/address-form/address-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { productDetailReducer } from './product-detail/state/productdetail.reducer';
import { ProductDetailEffects } from './product-detail/state/productdetail.effects';

import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { VendorComponent } from './vendor/vendor.component';
import { VendorModule } from './vendor/vendor.module';
import { ChangepasswordComponent } from './Authentication/changepassword/changepassword.component';
import { ForgotComponent } from './Authentication/forgot/forgot.component';
import { ForgotByEmailComponent } from './Authentication/forgot-by-email/forgot-by-email.component';
import { AuthGaurd } from '../services/auth.guard';
import { resolve } from 'dns';
import { ProductDetailResolverService } from '../services/Resolver/product-detail-resolver.service';
import { homepageResolverService } from '../services/Resolver/homepage.resolver.service';
import { PaginationBoxComponent } from './pagination-box/pagination-box.component';
import { CatmobComponent } from './catmob/catmob.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderByIdResolver } from '../services/Resolver/order.resolver';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { CompareProductComponent } from './compare-product/compare-product.component';
import { PaymentErrorComponent } from './checkout-page/payment-method-block/payment-error/payment-error.component';
import { WishlistComponent } from './product-detail/wishlist/wishlist.component';
import { PaymentSucessComponent } from './checkout-page/payment-method-block/payment-sucess/payment-sucess.component';





const pagesRoutes: Routes = [
  {

    path: '', component: HomeComponent,
    data: { breadcrumb: 'Home' },
    //resolve: { homepage: homepageResolverService }
  },
  {
    path: 'productlist', component: ProductComponent
  },
  {
    path: 'productdetail/:productName/:id/:catId', component: ProductDetailComponent,
    // resolve: { productDetail: ProductDetailResolverService },
    data: { breadcrumb: 'product' }
  },
  {
    path: 'category/:name/:id', component: CategoryComponent,
    data: { breadcrumb: 'category' }
  },
  {
    path: 'Vendor/:name/:id', component: CategoryComponent,
    data: { breadcrumb: 'Vendor' }
  },
  {
    path: 'search/:name', component: CategoryComponent,
    data: { breadcrumb: 'search' }
  },
  {
    path: 'Seeall/:name', component: CategoryComponent,
    data: { breadcrumb: 'Seeall' }
  },
  {
    path: 'login', component: LogInComponent
  },
  {
    path: 'shop', component: VendorComponent
  },
 
  {
    path: 'CartItem', component: ShoppingCartContainerComponent
  },
  {
    path: 'Checkout', component: CheckoutPageComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'Wishlist', component: WishlistComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'Address', component: DeliveryAddressBlockComponent
  },
  {
    path: 'deliveryAddress/update/:id', component: DeliveryAddressComponent
  },
  {
    path: 'Checkout/deliveryAddress', component: DeliveryAddressComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'cart/payment', component: PaymentMethodBlockComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'cart/payment/error', component: PaymentErrorComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'payment/success', component: PaymentSucessComponent,
    canActivate: [AuthGaurd],
  },
 
  {
    path: 'ChangePassword', component: ChangepasswordComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'forgotPassword', component: ForgotComponent
  },
  {
    path: 'forgotPasswordByEmail', component: ForgotByEmailComponent
  },
  {
    path: 'signUp', component: SignInComponent
  },
  {
    path: 'pagination', component: PaginationBoxComponent
  },
  {
    path: 'breadcrumb', component: BreadCrumbComponent
  },
  {
    path: 'profile/orderdetail/order/:id', component: OrdersComponent
  },
  {
    path: 'compareList', component: CompareProductComponent
  },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate: [AuthGaurd],
  },



];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
    ProfileModule,
    RouterModule.forChild(pagesRoutes),
    NgImageSliderModule,
    NgxContentLoadingModule,
    BrowserModule,
    NgxImageZoomModule,
    NgSelectModule,
    CategoryModule,
    NgbModule,
    AppRoutingModule,
    NgSelectModule,
    AuthenticationModule,
    VendorModule,
    FeatherModule.pick(allIcons),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBd5eujfslysDhbJ2pjOO3_VcScVtlA2Dw',
      libraries: ['places']
    }),
    StoreModule.forFeature('SimpleProductWidgets', fromSimpleProductWidget.SimpleProductWidgetReducer),
    EffectsModule.forFeature([
      SimpleProductWidgetEffects,
    ]),
    // StoreModule.forFeature('shop', shoppingListReducer),
    StoreModule.forFeature('deliveryAddress', fromDeliveryAddress.deliveryAddressReducer),
    EffectsModule.forFeature([
      DeliveryAddressEffects,
    ]),

  ],
  exports: [
    FeatherModule
  ],
  declarations: [
    ProductComponent,
    HomeComponent,
    HomebodyComponent,
    FeaturebrandsComponent,
    HomeCarouselComponent,
    CheckoutPageComponent,
    CartItemBlockComponent,
    PaymentMethodBlockComponent,
    DeliveryAddressBlockComponent,
    ProductSuggestionBlockComponent,
    ShoppingCartContainerComponent,
    ShoppingCartItemComponent,
    DeliveryAddressComponent,
    AddressFormComponent,
    CatmobComponent,
    OrdersComponent,
    CompareProductComponent,
    PaymentErrorComponent,
    PaymentSucessComponent,
  
    


  ]
})
export class PagesModule { }
