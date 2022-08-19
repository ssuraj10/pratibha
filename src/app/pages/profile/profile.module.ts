import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RatingAndreviewComponent } from './rating-andreview/rating-andreview.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { AuthGaurd } from 'src/app/services/auth.guard';

const profileroutes: Routes = [
  {
    path: 'profile',
    component:ProfileComponent,
    children: [
     {
       path: 'editprofile',
       component:  EditprofileComponent,
       canActivate: [AuthGaurd],
     },
     {
      path: 'orderdetail',
      component:  OrderhistoryComponent,
      canActivate: [AuthGaurd],
    },
    {
      path: 'dashboard',
      component:  DashboardComponent,
      canActivate: [AuthGaurd],
    },
    {
      path: 'ratingAndreview',
      component:  RatingAndreviewComponent,
      canActivate: [AuthGaurd],
    },
    {
      path: 'manageaddress',
      component:  ManageAddressComponent,
      canActivate: [AuthGaurd],
    },
    
    ],
   },
   
  
];

@NgModule({
  declarations: [ProfileComponent, OrderhistoryComponent, EditprofileComponent, DashboardComponent, RatingAndreviewComponent, ManageAddressComponent],
  imports: [
    ProductDetailModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(profileroutes),
  ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
