import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {
  relatedproductlist: any;
  productDetailId: any;
  activeSlides: any;

  constructor(private productDetailApi: ProductService,
    private router: ActivatedRoute,) { }

  ngOnInit() {
    this.productDetailId = this.router.snapshot.params.id;
    this.getrelatedproduct(this.productDetailId);
  }
  getrelatedproduct(productDetailId: number) {
    return this.productDetailApi.getrelatedproductbyid(productDetailId)
      .subscribe((data: any) => {
        this.relatedproductlist = data;
      });
  }
  customOptions: OwlOptions = {
    autoplay: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    dotsSpeed: 500,
    dots: false,
    smartSpeed: 400,
    dragEndSpeed: 350,
    navText: ['<img src=\'/assets/img/prev-round.svg\'>', '<img src=\'/assets/img/next-round.svg\'>'],

    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      900: {
        items: 6
      }
    },
    nav: true
  };

  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }
}
