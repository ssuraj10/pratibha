import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  categoriesitem: any;

  constructor(private productApi: ProductService) { }

  ngOnInit() {
    this.getCategories();
    // this.store.dispatch(new LoadProduct());
    // this.store.select(selectproducts).subscribe(res => {
    //   this.products = res;
    //   console.log(this.products);
    // });;
  }
  getCategories() {
    this.productApi.getcategoryAll().subscribe((data: any) => {
      this.categoriesitem = data;
      console.log(this.categoriesitem);
    });
   
  }



}
