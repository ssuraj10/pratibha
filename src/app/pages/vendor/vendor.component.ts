import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { VendorService } from 'src/app/services/vendor.service';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  slidesStore: any[] =[
    {
    id:1,
    url: 'https://i1.wp.com/www.smartprix.com/bytes/wp-content/uploads/2019/07/xiaomi-redmi-k20-pro-review-india-with-pros-and-con-2.jpg?resize=696%2C464&ssl=1'
    },
    {
      id:2,
      url: 'https://cdn.mos.cms.futurecdn.net/R4JUHrXr8HnCvFKLsxhe5h.jpg'
    },
    {
      id:4,
      url: 'https://cdn.mos.cms.futurecdn.net/R4JUHrXr8HnCvFKLsxhe5h.jpg'
    },
    {
      id:5,
      url: 'https://cdn.mos.cms.futurecdn.net/R4JUHrXr8HnCvFKLsxhe5h.jpg'
    }

  ];
  constructor(private VendorApi:VendorService) { }

  ngOnInit(): void {
  }
  carouselData: any[] = [
    { text: 'Slide 1 PM', dataMerge: 2, width: 300, dotContent: 'text1'},
    { text: 'Slide 2 PM', dataMerge: 1, width: 500, dotContent: 'text2'},
    { text: 'Slide 3 PM', dataMerge: 3, dotContent: 'text3'},
    { text: 'Slide 4 PM', width: 450, dotContent: 'text4'},
    { text: 'Slide 5 PM', dataMerge: 2, dotContent: 'text5'},
    { text: 'Slide 4 PM', width: 450, dotContent: 'text4'},
    { text: 'Slide 5 PM', dataMerge: 2, dotContent: 'text5'},
    { text: 'Slide 6', dotContent: 'text5'},
    { text: 'Slide 7', dotContent: 'text5'},
    { text: 'Slide 8', dotContent: 'text5'},
    { text: 'Slide 9', dotContent: 'text5'},
    { text: 'Slide 10', dotContent: 'text5'},
  ];
  // title = 'owl-carousel-libdemo';
  // owlNext = '&rarr;';
  // owlPrev = '&larr;';


  customOptions: OwlOptions = {
    // autoWidth: true,
    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: true,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
		autoplaySpeed: 1000,
    // dotsSpeed: 500,
    dots: true,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ "<img src='/assets/img/back.png' height='40' style='border-radius:50%;'>", "<img src='/assets/img/next.png' height='40' style='border-radius:50%;'>"],
    // navText: [  "<img src='/assets/img/prev-round.svg'>","<img src='/assets/img/next-round.svg'>" ],

    responsive: {
      0: {
        items: 1
      },
      1200: {
        items: 4
      },
    },
    // stagePadding: 40,
    // nav: true
  }
  activeSlides: any;


  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }

  // getcategories(Id: number) {

  //   return this.VendorApi.getOne(Id)
  //     .subscribe((data: any) => {
  //       this.categorieslist = data;
  //       this.pagelength = this.categorieslist.length;
  //       this.categorieslist.forEach(element => {
  //         this.currentImage.push(element.imageUrl);

  //       });
  //       this.totalpage = (Math.ceil(this.pagelength / this.pageSize))
  //       this.filteredCategoryList = this.categorieslist;
  //       const counts = {};
  //       this.categorieslist.forEach((p: any) => {
  //         counts[p.brandName] = counts[p.brandName] + 1 || 1;
  //       });
  //       this.brandItemsCount = counts;

  //       this.discount.forEach(dc => {
  //         this.categorieslist.forEach(element => {
  //           if ((dc.discountpercent - 20 <= element.discountPercent) && (element.discountPercent <= dc.discountpercent))
  //             dc.quantity = dc.quantity + 1;
  //         })
  //       })
  //     });

  // }


}
