import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromSimpleProductwidgets from '../homebody/store/simpleProductWidget.reducer';
import * as fromSimpleProductswidgetActions from '../homebody/store/simpleProductWidget.actions';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  cmsBanner: any[]=[{id: 2, imageUrl: 'https://goldbelly.imgix.net//uploads/collection/main_image/805/sale.e9feb6ff12c74d749173b83c7c39c6a1.jpg'},
    {id: 3, imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/healthymealdelivery-v2-1605029695.png?crop=1.00xw:0.502xh;0,0.260xh&resize=1200:*'},
    {id: 4, imageUrl: 'https://thumbs.dreamstime.com/b/people-eating-healthy-meals-wooden-table-top-view-food-delivery-people-eating-healthy-meals-wooden-table-food-delivery-160387494.jpg'}];
    carouselData: any;

  constructor(private store: Store<fromSimpleProductwidgets.AppState>,
    private widgetApi: ProductWidgetsService,) { }

  ngOnInit() {
    this.loadCmsContent();
  }

  loadCmsContent() {
    this.widgetApi.getAllsimpleProduct().subscribe(result=> {
      this.carouselData = result;
    })
  }
  getDetail(id) {
    return `#${id}`;
  }






  // carouselData: any = [
  //   { text: 'Slide 1 PM', dataMerge: 2, width: 300, dotContent: 'text1'},
  //   { text: 'Slide 2 PM', dataMerge: 1, width: 500, dotContent: 'text2'},
  //   { text: 'Slide 3 PM', dataMerge: 3, dotContent: 'text3'},
  //   { text: 'Slide 4 PM', width: 450, dotContent: 'text4'},
  //   { text: 'Slide 5 PM', dataMerge: 2, dotContent: 'text5'},
  // ];
  title = 'owl-carousel-libdemo';
  owlNext = '&rarr;';
  owlPrev = '&larr;';


  customOptions: OwlOptions = {
    // autoWidth: true,
    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
		autoplaySpeed: 2000,
    dotsSpeed: 500,
    // autoplayMouseleaveTimeout: 5000,
    // dots: false,
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
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      }
    },
    // stagePadding: 40,
    // nav: true //THIS IS NAV 
  }
  activeSlides: any;



  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }







  }


