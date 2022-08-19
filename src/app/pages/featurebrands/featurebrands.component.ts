import { Component, ElementRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromSimpleProductwidgets from '../homebody/store/simpleProductWidget.reducer';
import * as fromSimpleProductswidgetActions from '../homebody/store/simpleProductWidget.actions';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';

@Component({
  selector: 'app-featurebrands',
  templateUrl: './featurebrands.component.html',
  styleUrls: ['./featurebrands.component.css']
})
export class FeaturebrandsComponent implements OnInit {
  categoryItems: any;
  productDetailId: any;
  link: string;
  allwidget: any[];
  activeSlides2: any;
  allitem: any;
  constructor(private store: Store<fromSimpleProductwidgets.AppState>, private router: ActivatedRoute,
    private productDetailApi: ProductService,
    private widgetApi: ProductWidgetsService,
    private el: ElementRef,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // this.store.dispatch(new fromSimpleProductswidgetActions.LoadSimpleProductWidgets());
    // this.store.pipe(select(fromSimpleProductwidgets.getSimpleProductWidgets)).subscribe((data: any)=>{
    //   this.categoryItems = data;

    // });
    this.loadAllWidget();
    this. loadAll();
  }
  loadAllWidget() {
    this.widgetApi.getAllsimpleProduct().subscribe(result => {
      this.allwidget = result;

    });
  }



  customOptions: OwlOptions = {
    // autoWidth: true,
    // loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: false,
    autoplayTimeout: 3000,
    // autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dotsSpeed: 500,
    dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ "<img src='/assets/img/back.png' height='40' style='border-radius:50%;'>", "<img src='/assets/img/next.png' height='40' style='border-radius:50%;'>"],
    navText: ["<img src='/assets/img/prev-round.svg'>", "<img src='/assets/img/next-round.svg'>"],

    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      900: {
        items: 7
      }
    },
    // stagePadding: 40,
    nav: true
  }
  activeSlides: any;
  customOptions2: OwlOptions = {
    // autoWidth: true,
    // loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: false,
    autoplayTimeout: 3000,
    // autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dotsSpeed: 500,
    dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ "<img src='/assets/img/back.png' height='40' style='border-radius:50%;'>", "<img src='/assets/img/next.png' height='40' style='border-radius:50%;'>"],
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
    // stagePadding: 40,
    nav: true
  };
  public selectedItem = 1;
  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }

  loadAll() {
    this.widgetApi.getAll(this.selectedItem).subscribe((result: any) => {
      this.allitem = result;
      console.log(this.allwidget)


    });
  }
  getPassedData2(data: any) {
    this.activeSlides2 = data;
    // console.log(this.activeSlides);
  }

}
