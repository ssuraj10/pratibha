import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {BadgeModule} from 'primeng/badge';
import {TooltipModule} from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ItemsComponent,
    LoginComponent,
    RegistrationComponent,
    ItemDetailComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,BadgeModule,
    AppRoutingModule,TooltipModule,
    CardModule,HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    DialogModule,ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
