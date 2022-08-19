import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { first, tap, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AddProductToCart } from '../shopping-cart/shopping-cart-item/store/shop.action';
import { AppState } from 'src/app/app.reducer';
import * as fromApp from '../../app.reducer';
import * as fromSimpleProductwidgets from '../homebody/store/simpleProductWidget.reducer';
import * as fromSimpleProductswidgetActions from '../homebody/store/simpleProductWidget.actions';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductState, getCurrentProductId } from './state/productdetail.reducer';
import { LoadProducts } from './state/productdetail.action';
import { ReviewService } from 'src/app/services/Review.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { WishListService } from 'src/app/services/wishlist.service';

import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { data } from 'jquery';
import { MetaTagService } from 'src/app/services/metaTag.service';
import { CompareService } from 'src/app/services/compare.service';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { Meta, Title } from '@angular/platform-browser';
import { UseraddressService } from 'src/app/services/useraddress.service';
import { CountryService } from 'src/app/services/country.service';
import { DOCUMENT } from '@angular/common';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  categoryName: any;
  categorypage: any;
  categoryurl: any;
  imagehover: boolean;
  RatingReviewLength: any;
  attributeerror: string;
  ratingreviewnumber: any;
  metattile: string;
  Ratingreviewlength: any;
  country: any;
  satateOrProvince: any;
  district: any;
  city: any;
  postUrl: string;
  userid: any;
  allitem: any;

  constructor(public fb: FormBuilder, private store: Store<ProductState>,
    private Productstore: Store<fromSimpleProductwidgets.AppState>,
    private Cartstore: Store<fromApp.AppState>,
    private productDetailApi: ProductService,
    private ReviewApi: ReviewService,
    private WishListApi: WishListService,
    private router: ActivatedRoute,
    private local: LocalStoreService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private widgetApi: ProductWidgetsService,
    private cartapi: CartService,
    public authService: AuthService,
    private detailToCart: DetailToCartService,
    private compareService: CompareService,
    private route: Router,
    private metatagservice: MetaTagService,
    private restApi: UseraddressService,
    private countryApi: CountryService,
     @Inject(DOCUMENT) private document: Document) {
    this.imagehover = false;
    this.userid=localStorage.getItem('userId');
  }
  get optionValue() {
    return this.optionValueForm.get('value');
  }
  discountPercent: any;
  itemquantity: any = 1;
  ProductDetailList: any;
  productDetailId: any;
  link: string;
  itemlist: any;
  productItem: ProductDetail;
  itemlistByID: any;
  WishListArray: Array<any> = [];
  public wishclick = false;
  public wishicon: any = 'fa fa-heart-o';
  public countdown: string;
  private completed: boolean;
  interval: any;
  minDate: Date;
  maxDate: Date;
  currentDate: Date;
  RatingreviewList: any;
  relatedproductlist: any;

  isSubmitted = false;
  error: any;
  productdetailid: number;
  products: Observable<ProductDetail[]>;
  currentImage: any;
  productDetailObject: any;
  attributevalue = [];
  isClicked = false;
  checked = false;
  attributeValuesId: any;
  GroupList: any;
  imagepath: any;
  productAttributeItem: any; /// added to subscribe data
  productAttribute: any;
  selectedTasks: {};
  selectedvalue: {};
  selectedImages: any;
  Color: {};
  Cpu: {};
  Harddisk: {};
  productDetailList$: Observable<ProductDetail[]>;
  enabled: boolean;
  disabled: boolean;
  optionArray = [];
  optionCombinations = [];
  variations: any;
  selectedCombination = [];
  itemnumberarray = [];
  selectedVariation: any;
  productId: any;
  sum = 0;
  averagerating: number = 0;
  optionValueForm = this.fb.group({
    value: ['', [Validators.required]]
  });
  loading = false;
  form: FormGroup;
  getMasterForm: FormGroup;
  detailForm: FormGroup;

  PostArray: Array<any> = [];
  // minDate: Date;
  // maxDate: Date;
  // currentDate: Date;
  isDateInRange = false;
  selectedItem = 1;
  averageRatings;
  metaData(itemlist: any) {
    this.metatagservice.setMetaData({
      title: `${itemlist.product_name} for only Rs${itemlist.product_price}`,
      description: itemlist.description,
      image: itemlist.product_imgpath
    });

  }
  ngOnInit() {

  
    // breadcrumb
    this.categoryName = this.router.snapshot.params.productName;
    console.log( this.categoryName )
    this.categorypage = this.router.snapshot.data;
    this.categoryurl = this.route.routerState.snapshot.url;
   
    this.productDetailId = this.router.snapshot.params.id;
    this.postUrl = encodeURI(document.location.href);
    // this.getproductDetail(this.productDetailId);
    // breadcrumbend
    console.log(this.router.data)
    // this.router.data.pipe(
    //   map(data => data['productDetail']),
    //   tap(productDetail => this.metaData(productDetail)),
    // ).subscribe((data: any): void => {
    //   this.itemlist = data;  
    //   console.log(this.itemlist)
    //   this.minDate = new Date(this.itemlist.specialPriceStart);
    //   this.maxDate = new Date(this.itemlist.specialPriceEnd);
    //   this.currentDate = new Date();
    //   this.interval = +(new Date(this.itemlist.specialPriceEnd)) - Date.now();
    //   this.interval = this.interval / 1000;
    //   if (this.interval > 0) {
    //     this.isDateInRange = true;
    //     this.countdown = this.getTime();
    //   }

    //   this.discountPercent = ((data.oldPrice - data.price) * 100 / data.oldPrice);
    //   this.imagepath = data.productImages;
    //   if (data.variations.length > 0) {
    //     this.variations = data.variations;

    //     this.optionCombinations = data.variations.map((item) => item.optionCombinations);

    //     this.selectedVariation = this.variations[0]
       
    //     this.currentImage = this.variations[0].mediaUrl;



    //     for (let i = 0; i < this.optionCombinations[0].length; i++) {
    //       this.optionArray.push({
    //         value: this.optionCombinations[0][i].value,
    //         optionId: this.optionCombinations[0][i].optionId
    //       })

    //     }
    //   }
    //   else {
    //     this.currentImage = this.itemlist.thumbnailImageUrl;
    //   }

    //   for (let i = 1; i <= 15; i++) {
    //     this.itemnumberarray.push(i);
    //   }

    // });

    const countdownObservable = timer(1000, 1000).subscribe(val => {
      this.manipulateInterval();
      this.countdown = this.getTime();
      if (this.interval === 0) {
        this.countdownCompleted();
      }
    });

    this.productDetailId = this.router.snapshot.params.id;
    this.selectedItem = this.router.snapshot.params.catId;
    this.link = '/category/' + this.productDetailId;
    // this.getratingReview(this.productDetailId);
    this.detailForm = this.formBuilder.group({
      things: this.formBuilder.array([this.createDetailForm()])
    });

    this.route.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.widgetApi.getAll(this.selectedItem).subscribe((result: any) => {
      this.allitem = result;
      console.log(this.allitem)
      this.itemlist =  this.allitem.find(data=>{
        if(data.menu_id ==  this.productDetailId){
          return data;
        }
      })
      console.log(this.itemlist)
      this.currentImage = this.itemlist.image;
    });
    for (let i = 1; i <= 15; i++) {
      this.itemnumberarray.push(i);
    }
   

  }



  // this.store.select(state => {
  //   return state;
  // }).subscribe(state => {
  //   console.log(state);
  // })
  // this.productdetailid = this.route.snapshot.params['id'];
  // console.log(this.productdetailid);
  // if(this.productdetailid){
  //   this.getItem(this.productdetailid)
  // }

  // this.store.dispatch(new LoadProducts());
  // this.store.select(getCurrentProductId).subscribe((data: any) => {
  //   this.productDetailObject = data;
  //   console.log(this.productDetailObject)
  //   this.discountPercent = ((data.oldPrice - data.price) * 100 / data.oldPrice);
  //   this.imagepath = data.productImages;
  //   if (data.variations) {
  //     this.variations = data.variations;
  //     this.optionCombinations = data.variations.map((item) => item.optionCombinations);
  //   }
  //   this.currentImage = this.productDetailObject.thumbnailImageUrl;
  // });





  getproductDetail(productDetailId: number) {
    return this.productDetailApi.getbyid(productDetailId)
      .subscribe((data: any) => {
        this.itemlist = data.data;
        this.selectedVariation = data.data;
        console.log(this.itemlist);
        console.log(this.selectedVariation);
        console.log(this.itemlist.product_price)
        this.minDate = new Date(this.itemlist.product_price);
        this.maxDate = new Date(this.itemlist.product_price);
        console.log(this.maxDate);
        this.currentDate = new Date();
        this.interval = +(new Date(this.itemlist.product_price)) - Date.now();
        console.log(this.interval)
        this.interval = this.interval / 1000;
        if (this.interval > 0) {
          this.isDateInRange = true;
          this.countdown = this.getTime();
        }

        this.discountPercent = ((data.product_discount - data.product_price) * 100 / data.product_discount);
        this.imagepath = data.imagedata;
        if (data.variations) {
          this.variations = data.variations;
          this.optionCombinations = data.variations.map((item) => item.optionCombinations);
        }
        this.currentImage = this.itemlist.product_imgpath;
        for (let i = 1; i <= 15; i++) {
          this.itemnumberarray.push(i);
        }
      });
  }



  // getItem(id: number) {
  //   this.store.dispatch(new fromSimpleProductswidgetActions.LoadSimpleProductWidget(id));
  //   const option$: Observable<any> = this.store.select(
  //     fromSimpleProductwidgets.getCurrentproductId
  //   );
  //   option$.subscribe(data => {
  //     this.productDetailObject = data;
  //   });
  //   console.log(option$);
  //   console.log(this.productDetailObject)
  // }
  private createDetailForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      quantity: ['', Validators.required],
    });
  }
  onAddProductToCart() {
   

      const item = {
        productId: this.itemlist.menu_id,
        productName: this.itemlist.menu_name,
        productPrice:  this.itemlist.price,
        quantity: this.itemquantity ? parseInt(this.itemquantity) : 1,
        productImage: this.itemlist.image,
        total: this.itemlist.price * (this.itemquantity ? this.itemquantity : 1)
      };
      this.detailToCart.addToCart(item);

  }

  onColorChange(id: number) {
    this.Color = id;
  }
  selectimage(id: any) {
    this.selectedImages = id;
  }

  forClass(value, optionId) {
    const item = { optionId, value };
    if (this.optionArray.length === 0) {
      this.optionArray.push(item);
    } else {
      if (this.optionArray.some((data) => data.optionId === item.optionId)) {
        const index = this.optionArray.findIndex(data => data.optionId === item.optionId);
        this.optionArray[index] = item;
      } else {
        this.optionArray.push(item);
      }
    }


  }

  forDisable(value, optionId) {
    this.selectedCombination = [];
    const newArray = [];
    for (let i = 0; i < this.optionCombinations.length; i++) {
      if (this.optionCombinations[i].some((data) => data.value === value)) {
        for (let j = 0; j < this.optionCombinations[i].length; j++) {
          if (!(this.selectedCombination.some((data) => data.value === this.optionCombinations[i][j].value))) {
            const item = {
              optionId: this.optionCombinations[i][j].optionId,
              value: this.optionCombinations[i][j].value
            };
            this.selectedCombination.push(item);
          }
        }
      }
    }
    this.forClass(value, optionId);
    for (let i = 0; i < this.optionArray.length; i++) {
      if (this.selectedCombination.some((data) => data.value === this.optionArray[i].value)) {
        newArray.push(this.optionArray[i]);
      }

    }
    this.optionArray = newArray;
    for (let i = 0; i < this.selectedCombination.length; i++) {
      if (!(this.optionArray.some((data) => data.optionId === this.selectedCombination[i].optionId))) {
        this.optionArray.push(this.selectedCombination[i]);
      }
    }


    for (let i = 0; i < this.variations.length; i++) {
      let count = 0;
      for (let j = 0; j < this.optionArray.length; j++) {
        if (this.variations[i].optionCombinations.some((data) => data.value === this.optionArray[j].value)) {
          count++;
        }
      }
      if (count === this.variations[i].optionCombinations.length) {
        this.selectedVariation = this.variations[i];
        this.currentImage = this.variations[i].mediaUrl;
        return;
      }


    }

  }

  activeClass(value) {
    if (this.optionArray.some((data) => data.value === value)) {
      return true;
    }
  }

  disableButton(value) {
    if (this.selectedCombination.length === 0) {
      return true;
    } else {
      if (this.selectedCombination.some((data) => data.value === value)) {
        return true;
      }
    }
  }
  changeImage(n: number) {
    this.currentImage = this.imagepath[n].mediaUrl;
  }
  totalquantity(e) {
    this.itemquantity = e.target.value;
  }


  getItem(id: number) {
    this.store.dispatch(new fromSimpleProductswidgetActions.LoadSimpleProductWidget(id));
    const option$: Observable<any> = this.store.select(
      fromSimpleProductwidgets.getCurrentOption
    );

    option$.subscribe((currentOption: any) => {
      this.itemlistByID = currentOption;
    });
  }
  // onSubmit() {
  //   this.isSubmitted = true;
  //   this.attributevalue = [];
  //   if (!this.optionValueForm.valid) {
  //     return false;
  //   } else {
  //     alert(JSON.stringify(this.optionValueForm.value));
  //     this.attributevalue.push(this.optionValueForm.value);
  //     console.log(this.attributevalue);
  //   }
  // }


  // onEditSubmit() {

  //   if(this.selectedVariation){
  //     this.productId=this.selectedVariation.id;
  //   }else{
  //     this.productId=this.productDetailObject.id;
  //   }
  //   this.isSubmitted = true;

  //    this.alertify.confirm('Are you sure you want to update?', () => {
  //     this.GroupApi.edit(this.productId, this.form.value)
  //       .pipe(first())
  //       .subscribe(
  //         data => {
  //           this.alertify.success('One record updated !');
  //           this.ngOnInit();
  //           // this.router.navigate([this.returnUrl]);
  //         },
  //         error => {
  //           this.error = error;
  //           this.alertify.error(this.error);
  //         });
  //   });
  // }
  toggleWish() {
    this.wishclick = !this.wishclick;
    if (this.wishclick === true) {
      this.AddWishList();
    }
    else {
      console.log('clicked false');
    }
    // CHANGE THE NAME OF THE BUTTON.
    if (this.wishclick) {

      this.wishicon = 'fa fa-heart';

    } else {
      this.wishicon = 'fa fa-heart-o';
    }
  }
  private getTime(): string {
    if (this.interval < 0) {
      this.interval = Math.abs(this.interval);
      this.completed = true;
    }
    const days = Math.floor(this.interval / (3600 * 24));
    const hours = Math.floor((this.interval - days * 3600 * 24) / 3600);
    const minutes = Math.floor((this.interval - hours * 3600 - days * 3600 * 24) / 60);
    const seconds = Math.round(this.interval - (hours * 3600) - (minutes * 60) - (days * 3600 * 24));
    return `${days.toString().padStart(3, '0')}Days:${hours.toString().padStart(2, '0')}Hours:${minutes.toString().padStart(2, '0')}Min:${seconds.toString().padStart(2, '0')}Sec.`;
  }

  private manipulateInterval() {
    if (this.completed) {
      this.interval++;
    } else {
      this.interval--;
    }
  }

  countdownCompleted() {
    this.completed = true;
    // this.onComplete.emit();
  }


  AddWishList() {
    this.loading = true;
    this.getMasterForm = this.formBuilder.group({
      productId: [this.itemlist.id],
    });
    this.WishListArray.push(this.getMasterForm.value);
    this.WishListApi.create(this.getMasterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.alertify.success('Added to wishlist!');
          } else {
            this.alertify.error('Error !' + data.message);
          }
          this.ngOnInit();
        }
      );
  }

  deletelist() {
    this.alertify.confirm('Are you sure you want to delete?', () => {
      this.WishListApi.delete(this.itemlist.id)
        .pipe(first())
        .subscribe(() => this.ngOnInit());
      this.alertify.success('deleted !');
    });
  }

  getratingReview(productDetailId: any) {
    return this.WishListApi.getRatingOne(productDetailId)
      .subscribe(data => {
        this.ratingreviewnumber = data;
        this.RatingreviewList = data.ratingandReviews;

        if (this.RatingreviewList) {
          this.RatingReviewLength = this.RatingreviewList.length;
          this.RatingreviewList.forEach(element => {
            this.sum = this.sum + element.rating;
          });
          this.averagerating = this.sum / this.RatingreviewList.length;
        }



      });
  }
  AddCompare() {
    const item = {
      productId: this.selectedVariation ? this.selectedVariation.id : this.itemlist.id,
      productName: this.selectedVariation ? this.selectedVariation.name : this.itemlist.name,
      salesRate:this.selectedVariation ? this.selectedVariation.price : this.itemlist.price,
      imageUrl:this.selectedVariation ? this.selectedVariation.mediaUrl : this.itemlist.thumbnailImageUrl,
      brandName:this.selectedVariation ? this.selectedVariation.name : this.itemlist.name,
      isVisibleIndividually:this.selectedVariation ? this.selectedVariation.isVisibleIndividually : this.itemlist.isVisibleIndividually,
    };
    this.compareService.addtocompare(item);
  }
  fbIcon = faFacebookSquare;

  public toggle: boolean = false;
  clickEvent(event) {
    console.log(event);
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;
  }

  getAllCountry() {
    this.countryApi.getAll().subscribe(result => {
      this.country = result;
      console.log(this.country)
    });
  }
  findcountryId(event) {
    console.log(event);
    this.countryApi.getProvincesByCountryId(event.id).subscribe(result => {
      console.log(result);
      this.satateOrProvince = result;
    });
  }
  findProvinceOrZoneEdit(item) {
    return this.countryApi.getOneProvinceTreeByCountryIdAndKey(item.countryId, item.stateOrProvinceId).subscribe(result => {
      this.district = result;
    });
  }
  findeDistrictEdit(item) {
    return this.countryApi.getOneProvinceTreeByCountryIdAndKey(item.countryId, item.districtId).subscribe(result => {
      this.city = result;
      console.log(this.city);
    });
  }


 
 
  
}
