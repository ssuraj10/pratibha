import { Component, OnInit, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSimpleProductwidgets from './store/simpleProductWidget.reducer';
import * as fromSimpleProductswidgetActions from './store/simpleProductWidget.actions';
import { SimpleProductWidget } from './store/simpleProductWidget.model';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { MetaTagService } from 'src/app/services/metaTag.service';

@Component({
  selector: 'app-homebody',
  templateUrl: './homebody.component.html',
  styleUrls: ['./homebody.component.css']
})
export class HomebodyComponent implements OnInit {

  constructor(private store: Store<fromSimpleProductwidgets.AppState>,
    private widgetApi: ProductWidgetsService,
    private el: ElementRef,
    private route: ActivatedRoute,
    private metatagservice:MetaTagService) {
    this.allwidget = this.route.snapshot.data['homepage'];
  }
  items$: Observable<SimpleProductWidget[]>;
  SimpleProductItems: any;
  allwidget: any = [{}];
  public selectedItem = 1;
 


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
  activeSlides: any;
  metaData(allwidget: any) {
    this.metatagservice.setMetaData({
      title: `${allwidget.simpleProductWidget.productName} for only $${allwidget.simpleProductWidget.specialAmount}`,
      description: allwidget.simpleProductWidget.description,
      image: allwidget.simpleProductWidget.imageUrl
    });
    }

  ngOnInit(): void {
    this.loadAllWidget();

    // this.store.dispatch(new fromSimpleProductswidgetActions.LoadSimpleProductWidgets());
    // this.store.pipe(select(fromSimpleProductwidgets.getSimpleProductWidgets)).subscribe((data: any) => {
    //   this.SimpleProductItems = data;

    // });


  }

  loadAllWidget() {
    this.widgetApi.getAll(this.selectedItem).subscribe((result:any) => {
      this.allwidget = result;
 console.log( this.allwidget)
      
   
    });
  }


  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }

}
