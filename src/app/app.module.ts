import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZoomeffectComponent } from './zoomeffect/zoomeffect.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { AuthService } from './services/auth.service';
import { AppStoreModule } from './Store/app-store.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductDetailModule } from './pages/product-detail/product-detail.module';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { JwtInterceptor } from './services/jwt.interceptor';
import { Ng5SliderModule } from 'ng5-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGaurd } from './services/auth.guard';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { ClickOutsideModule } from 'ng-click-outside';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductDetailResolverService } from './services/Resolver/product-detail-resolver.service';
import { homepageResolverService } from './services/Resolver/homepage.resolver.service';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { MenuService } from './services/menu.service';
import { CategoryResolverService } from './services/Resolver/category.resolver.service';
import { HeaderTwoComponent } from './layout/header-two/header-two.component';
import { OthersModule } from './others/others.module';
import { ProfileModule } from './pages/profile/profile.module';
import { ChatBoxComponent } from './chat-box/chat-box.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ZoomeffectComponent,
    HeaderTwoComponent,
    ChatBoxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxImageZoomModule,
    AppRoutingModule,
    PagesModule,
    SocialLoginModule,
    NgImageSliderModule,
    NgxContentLoadingModule,
    BrowserAnimationsModule,
    NgbModule,
    Ng5SliderModule,
    ClickOutsideModule,
    AppStoreModule,
    ProductDetailModule,
    NgxAutocompleteModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBd5eujfslysDhbJ2pjOO3_VcScVtlA2Dw',
      libraries: ['places']
    }),
    OthersModule,
    
 
  ],
  exports: [
    NgxImageZoomModule
  ],
  providers: [
    AuthGaurd,
    DatePipe,
    AuthService,
    MenuService,
    ProductDetailResolverService,
    homepageResolverService,
    CategoryResolverService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1554966634651671'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
