import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from '../state';
import { LoadProduct } from '../state/product.action';
import { selectproducts } from '../state/product.selector';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';
import { brands } from 'src/app/data/brands';
import { AddBrandToFilter, RemoveBrandFromFilter } from '../filterstore/brand-filter/brand-filter.actions';
import * as fromApp from '../../app.reducer';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { pricelimit } from 'src/app/models/interfaces';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { DiscountfiltersPipe } from 'src/app/pipes/discountfilter.pipe';
import { Options, LabelType } from 'ng5-slider';
import { filter, map, first, tap } from 'rxjs/operators';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompareService } from 'src/app/services/compare.service';
import { VendorService } from 'src/app/services/vendor.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { MetaTagService } from 'src/app/services/metaTag.service';
import { SearchProductService } from 'src/app/services/search-product.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  page = 1;
  pageSize = 12;
  public isCollapsed = true;
  public sliderType: any;
  priceFilterForm: FormGroup;
  brands = [];
  discountItem = [];
  categories = [];
  brandItemsCount: any;
  products: any;
  items$: Observable<Product[]>;
  categorieslist: any;
  categoryId: any;
  link: string;
  name = [];
  discountArray: number[] = [];
  filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed: any[] = [];
  discountUpperRange: any;
  activeState = 'Beats Headphones';
  @Input() priceMinFilter: number | null;
  @Input() priceMaxFilter: number | null;
  startIndex = 0;
  endIndex = 2;
  ProdData: any[] = [];
  isClicked = false;
  countdown: any;
  loading = false;
  interval: number;
  completed: boolean;
  isDateInRange: boolean;
  isSliderFilterisInitialized: boolean = false;
  maxDate: any;
  currentDate: Date;
  minDate: Date;
  getMasterForm: FormGroup;
  pagelength: any;
  pagenumber: number;
  categoriesItemlist: any;
  filteredCategoryList: any;
  filterCustomList: any;
  filterCustomDiscountdList: any;
  sliderFilterList: any;
  brandNameArray: any[] = [];
  slidebarFilterData: any[] = [];
  private _filterFromSearchBrand: string;
  breadcrumbs: any[];

  PostArray: Array<any> = [];
  expandedIndex: number;
  categoriesId: Array<any> = [];
  totalpage: number;
  comparelist: Array<any> = [];
  currentImage: Array<any> = [];
  currentImageIndex: number;
  productImageContainerClientWidth: any;
  @ViewChild('productImageContainer') productImageContainer: ElementRef;
  offSetLeft: number;
  offSetTop: number;
  catorvenpage: any;
  Categoryproduct: any;
  categoryName: any;
  variations: any;
  optionCombinations = [];
  selectedVariation: any;
  optionArray = [];
  selectedCombination = [];
  quantity: number = 1;
  userid: any;

  get filterFromSearchBrand(): string {
    return this._filterFromSearchBrand;
  }

  set filterFromSearchBrand(value: string) {
    this._filterFromSearchBrand = value;
    this.filteredCategoryList = this.filterBrand(value);
  }

  filterBrand(brandsearch: string) {
    return this.categorieslist.filter(_item =>
      _item.brandName.toLowerCase().indexOf(brandsearch.toLocaleLowerCase()) !== -1)
  }

  discount: any[] = [
    { quantity: 0, discountpercent: 20, discountRange: '0-20' },
    { quantity: 0, discountpercent: 40, discountRange: '20-40' },
    { quantity: 0, discountpercent: 60, discountRange: '40-60' },
    { quantity: 0, discountpercent: 80, discountRange: '60-80' },
    { quantity: 0, discountpercent: 100, discountRange: '80-100' }
  ];
  pricearray: Array<number> = [0, 500000];
  minValue: number = this.pricearray.reduce((a, b) => Math.min(a, b));
  maxValue: number = this.pricearray.reduce((a, b) => Math.max(a, b));
  options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,

  };

  constructor(private store: Store<AppState>,
    private router: ActivatedRoute,
    private restApi: ProductService,
    private widgetApi: ProductWidgetsService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private cartapi: CartService,
    public authService: AuthService,
    config: NgbRatingConfig,
    private activatedRoute: ActivatedRoute,
    private routers: Router,
    private detailToCart: DetailToCartService,
    private VendorApi: VendorService,
    private compareService: CompareService,
    private localStore: LocalStoreService,
    private metatagservice: MetaTagService,
    private _searchService: SearchProductService,
    private filterstore: Store<fromApp.AppState>
  ) {
    config.max = 5;
    config.readonly = true;
    this.userid=localStorage.getItem('userId');
  }
  metaData(categorieslist: any) {
    console.log(categorieslist)
    this.metatagservice.setMetaData({
      title: `${categorieslist}`,
      description: `${categorieslist}`,
      twitter:`${categorieslist}`,
      og:`${categorieslist}`,
    });
  }

  ngOnInit() {
    this.router.data.pipe(map(data => { })
    ).subscribe((data: any): void => {

    })


    this.expandedIndex = -1;
    this.categoryName = this.activatedRoute.snapshot.params.name;

    this.catorvenpage = this.activatedRoute.snapshot.data.breadcrumb;

    this.metaData(this.categoryName)
    this.categoryId = this.router.snapshot.params.id;
    this.link = '/category/' + this.categoryId;
    this.getcategories(this.categoryId);

    this.getBrand();
    this.getcategoriesItem(this.categoryId);
    const countdownObservable = timer(1000, 1000).subscribe(val => {
      this.manipulateInterval();
      this.countdown = this.getTime();
      if (this.interval === 0) {
        this.countdownCompleted();
      }
    });
  }


  getBrand() {
    this.widgetApi.getAllBrand().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.brands.push(data[i].name);
      }
    });
  }

  filterPrice(filter: pricelimit) {
    this.priceMinFilter = filter.priceMin;
    this.priceMaxFilter = filter.priceMax;
  }

  getcategories(Id: number) {
    if (this.catorvenpage == 'category') {
      this.widgetApi.getcategorieslist(Id)
        .subscribe((data: any) => {
        this.categorieslist = data;
      
          this.pagelength = this.categorieslist.length;
          // if(data){
          //   this.categorieslist.forEach(element => {
          //     this.currentImage.push(element.imageUrl);

          //   });
          // }

          this.totalpage = (Math.ceil(this.pagelength / this.pageSize))
          this.filteredCategoryList = this.categorieslist;
          console.log(this.filteredCategoryList)
          this.pricearray = [];
          for (let i = 0; i < this.filteredCategoryList.length; i++) {
            this.pricearray.push(this.filteredCategoryList[i].product_price);

          }
      
       
          this.maxValue = this.pricearray.reduce((a, b) => Math.max(a, b));
          this.options = {
            floor: this.minValue,
            ceil: this.maxValue,
        
          };
          const counts = {};
          this.categorieslist.forEach((p: any) => {
            counts[p.brandName] = counts[p.brandName] + 1 || 1;
          });
          this.brandItemsCount = counts;

          this.discount.forEach(dc => {
            this.categorieslist.forEach(element => {
              if ((dc.discountpercent - 20 <= element.discountPercent) && (element.discountPercent <= dc.discountpercent))
                dc.quantity = dc.quantity + 1;
            })
          })

          // this.categorieslist = this.categorieslist.sort((low, high) => low.salesRate - high.salesRate); 
        });
    }
    if (this.catorvenpage == 'Vendor') {
      this.widgetApi.getcategorieslist(Id)
        .subscribe((data: any) => {
          this.categorieslist = data;
          this.pagelength = this.categorieslist.length;
          this.categorieslist.forEach(element => {
            this.currentImage.push(element.imageUrl);

          });
          this.totalpage = (Math.ceil(this.pagelength / this.pageSize))
          this.filteredCategoryList = this.categorieslist;
          this.pricearray = [];
          for (let i = 0; i < this.filteredCategoryList.length; i++) {
            this.pricearray.push(this.filteredCategoryList[i].salesRate);

          }
          console.log(this.pricearray)
       
          this.maxValue = this.pricearray.reduce((a, b) => Math.max(a, b));
          this.options = {
            floor: this.minValue,
            ceil: this.maxValue,
        
          };
          const counts = {};
          this.categorieslist.forEach((p: any) => {
            counts[p.brandName] = counts[p.brandName] + 1 || 1;
          });
          this.brandItemsCount = counts;

          this.discount.forEach(dc => {
            this.categorieslist.forEach(element => {
              if ((dc.discountpercent - 20 <= element.discountPercent) && (element.discountPercent <= dc.discountpercent))
                dc.quantity = dc.quantity + 1;
            })
          })

          // this.categorieslist = this.categorieslist.sort((low, high) => low.salesRate - high.salesRate); 
        });
    }
    if (this.catorvenpage == 'Seeall') {
      this.widgetApi.getcategorieslist(Id)
        .subscribe((data: any) => {
          this.categorieslist = data;

          for (let i = 0; i < data.length; i++) {

            if (data[i].name === this.categoryName) {
              this.filteredCategoryList = this.categorieslist[i].simpleProductWidget;

              this.categorieslist = this.filteredCategoryList;
            
           
              this.pricearray = [];
              for (let i = 0; i < this.filteredCategoryList.length; i++) {
                this.pricearray.push(this.filteredCategoryList[i].specialAmount);

              }
             
           
              this.maxValue = this.pricearray.reduce((a, b) => Math.max(a, b));
              this.options = {
                floor: this.minValue,
                ceil: this.maxValue,
            
              };

              this.pagelength = this.categorieslist.length;
              this.categorieslist.forEach(element => {
                this.currentImage.push(element.imageUrl);

              });
              this.totalpage = (Math.ceil(this.pagelength / this.pageSize))

              // for(let i=0;i<this.categorieslist.length;i++){
              //   this.priceList.push(this.categorieslist[i].salesRate)

              // }
              // console.log(this.priceList)
              // this.minValue=this.priceList.reduce((a, b) => Math.min(a, b));
              // this.maxValue=this.priceList.reduce((a, b) => Math.max(a, b));
              const counts = {};
              this.categorieslist.forEach((p: any) => {
                counts[p.brandName] = counts[p.brandName] + 1 || 1;
              });
              this.brandItemsCount = counts;

              this.discount.forEach(dc => {
                this.categorieslist.forEach(element => {
                  if ((dc.discountpercent - 20 <= element.discountPercent) && (element.discountPercent <= dc.discountpercent))
                    dc.quantity = dc.quantity + 1;
                })
              })
            }
          }
          // this.categorieslist = this.categorieslist.sort((low, high) => low.salesRate - high.salesRate); 
        });

    }
    if (this.catorvenpage == 'search') {
      this._searchService.searchProduct(this.categoryName)
        .subscribe((data: any) => {
        
          this.categorieslist = data.data;
          this.filteredCategoryList=this.categorieslist;

        
          this.pagelength = this.filteredCategoryList.length;
          this.filteredCategoryList.forEach(element => {
            this.currentImage.push(element.imageUrl);

          });
          this.totalpage = (Math.ceil(this.pagelength / this.pageSize))

          this.pricearray = [];
          for (let i = 0; i < this.filteredCategoryList.length; i++) {
            this.pricearray.push(this.filteredCategoryList[i].price);

          }
        //  this.maxValue = this.pricearray.reduce((a, b) => Math.max(a, b));
          this.options = {
            floor: this.minValue,
            ceil: this.maxValue,
        
          };
          const counts = {};
          this.filteredCategoryList.forEach((p: any) => {
            counts[p.brandName] = counts[p.brandName] + 1 || 1;
          });
          this.brandItemsCount = counts;

          this.discount.forEach(dc => {
            this.filteredCategoryList.forEach(element => {
              if ((dc.discountpercent - 20 <= element.discountPercent) && (element.discountPercent <= dc.discountpercent))
                dc.quantity = dc.quantity + 1;
            })
          })

          // this.categorieslist = this.categorieslist.sort((low, high) => low.salesRate - high.salesRate); 
        });
    }

  }
  getproductbyid(item: any) {
    this.Categoryproduct = item;
    this.currentImage = item.image;
    // this.restApi.getbyid(Id)
    //   .subscribe((data: any) => {
    //     this.Categoryproduct = data.data;

    //     this.quantity = 1;
    //     if (data.variations.length > 0) {
    //       this.variations = data.variations;
    //       this.optionCombinations = data.variations.map((item) => item.optionCombinations);

    //       this.selectedVariation = this.variations[0]
    //       this.currentImage = this.variations[0].mediaUrl;



    //       for (let i = 0; i < this.optionCombinations[0].length; i++) {
    //         this.optionArray.push({
    //           value: this.optionCombinations[0][i].value,
    //           optionId: this.optionCombinations[0][i].optionId
    //         })

    //       }
    //     }
    //   });



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
  onIncrement(): void {
    this.quantity += 1;
  }

  onDecrement(): void {
    if (this.quantity > 0)
      this.quantity -= 1;
    else
      this.quantity = 0;
  }

  onChangeSelectBox(e): void {
    let brandName = e.target.name;
    const value = e.target.checked;
    if (value) {
      this.brandNameArray.push(brandName);
      this.brandFilter(this.brandNameArray);
    }
    else {
      for (let i = 0; i < this.brandNameArray.length; i++) {
        if (this.brandNameArray[i] == brandName) {
          this.brandNameArray.splice(i, 1);
          this.brandFilter(this.brandNameArray);
        }
      }
    }

    if (name == null) {

      return this.categorieslist;
    }
  }

  onChangeSelectBoxDiscount(e): void {
    this.discountUpperRange = e.target.name;
    const value = e.target.checked;
    if (value) {
      this.discountArray.push(parseInt(this.discountUpperRange));
      this.discountFilter(this.discountArray);
    }
    else {
      for (let i = 0; i < this.discountArray.length; i++) {
        if (this.discountArray[i] == this.discountUpperRange) {
          this.discountArray.splice(i, 1);
          this.discountFilter(this.discountArray);
        }
      }
    }
  }

  // filterbycategory(id) {
  //   this.categorieslist = this.categorieslist.foreach(element => {
  //     for (let i = 0; i < element.categoryIds.length; i++) {
  //       element.categoryIds[i].filter(item=>item===id);
  //       console.log(id);
  //       console.log(element.categoryIds[i])
  //     }

  //   },
  //     console.log(this.categorieslist)
  //   )

  // }
  filterbycategory(id) {


  }

  sortproduct(e: any) {
    this.name = e;
    const value = e;
    if (name == null) {
      return this.categorieslist;
    }
  }

  setStateAsActive(state) {
    this.activeState = state;
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
  }

  checked() {
    return this.brands.filter(item => item.checked);

  }

  updateIndex(pageIndex) {
    this.pagenumber = pageIndex / 2
    this.startIndex = pageIndex * 2;
    this.endIndex = this.startIndex + 2;
  }

  getcategoriesItem(categoryId: number) {
    return this.widgetApi.getcategorieslist(categoryId)
      .subscribe((data: any) => {
        this.categoriesItemlist = data;
      });
  }

  discountFilter(discountrangeUpperValue: any[] | undefined): any {
    if (this.brandNameArray.length == 0 && this.isSliderFilterisInitialized == false) {
      let filter_list = this.categorieslist;
      if (discountrangeUpperValue.length == 0) {
        return this.filteredCategoryList = this.categorieslist;
      }
      else {
        this.filteredCategoryList = [];
        for (let i = 0; i < discountrangeUpperValue.length; i++) {
          filter_list.forEach(_item => {
            if ((discountrangeUpperValue[i] - 20 <= _item.discountPercent) && (_item.discountPercent <= discountrangeUpperValue[i])) {
              this.filteredCategoryList.push(_item)
            }
          })
        }
        this.filterCustomDiscountdList = this.filteredCategoryList;
        return this.filteredCategoryList;
      }
    }
    else {
      if (discountrangeUpperValue.length === 0) {
        if (this.brandNameArray.length != 0 && this.isSliderFilterisInitialized == false)
          return this.filteredCategoryList = this.filterCustomList;
        else if (this.brandNameArray.length == 0 && this.isSliderFilterisInitialized == true)
          return this.filteredCategoryList = this.sliderFilterList;
        else
          return this.filteredCategoryList = this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed;
      }
      else {
        let filter_list = this.filterCustomList;
        if (this.brandNameArray.length != 0 && this.isSliderFilterisInitialized == false) {
          this.filteredCategoryList = [];
          for (let i = 0; i < discountrangeUpperValue.length; i++) {
            filter_list.forEach(_item => {
              if ((discountrangeUpperValue[i] - 20 <= _item.discountPercent) && (_item.discountPercent <= discountrangeUpperValue[i])) {
                this.filteredCategoryList.push(_item)
              }
            })
          }
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
        else if (this.brandNameArray.length == 0 && this.isSliderFilterisInitialized == true) {
          this.filteredCategoryList = [];
          for (let i = 0; i < discountrangeUpperValue.length; i++) {
            this.sliderFilterList.forEach(_item => {
              if ((discountrangeUpperValue[i] - 20 <= _item.discountPercent) && (_item.discountPercent <= discountrangeUpperValue[i])) {
                this.filteredCategoryList.push(_item)
              }
            })
          }
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
        else {
          this.filteredCategoryList = [];
          for (let i = 0; i < discountrangeUpperValue.length; i++) {
            this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed.forEach(_item => {
              if ((discountrangeUpperValue[i] - 20 <= _item.discountPercent) && (_item.discountPercent <= discountrangeUpperValue[i])) {
                this.filteredCategoryList.push(_item)
              }
            })
          }
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
      }
    }
  }

  brandFilter(brand: string[]): any {
    if (this.discountArray.length == 0 && this.isSliderFilterisInitialized == false) {
      let filter_list = this.categorieslist;
      if (brand.length === 0) {
        return this.filteredCategoryList = this.categorieslist;
      } else {
        const newArray = [];
        for (let i = 0; i < brand.length; i++) {
          filter_list.forEach(_item => {
            if (_item.brandName == brand[i])
              newArray.push(_item)
          });
        }
        this.filterCustomList = newArray;
        this.filteredCategoryList = newArray;
        return this.filteredCategoryList;
      }
    }
    else {
      let filter_list = this.filterCustomDiscountdList;
      if (brand.length === 0) {
        if (this.discountArray.length != 0 && this.isSliderFilterisInitialized == false)
          return this.filteredCategoryList = this.filterCustomDiscountdList;
        else if (this.discountArray.length == 0 && this.isSliderFilterisInitialized == true)
          return this.filteredCategoryList = this.sliderFilterList;
        else
          return this.filteredCategoryList = this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed;
      } else {
        if (this.discountArray.length != 0 && this.isSliderFilterisInitialized == false) {
          const newArray = [];
          for (let i = 0; i < brand.length; i++) {
            filter_list.forEach(_item => {
              if (_item.brandName == brand[i])
                newArray.push(_item)
            });
          }
          this.filterCustomList = newArray;
          this.filteredCategoryList = newArray;
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
        else if (this.discountArray.length == 0 && this.isSliderFilterisInitialized == true) {
          const newArray = [];
          for (let i = 0; i < brand.length; i++) {
            this.sliderFilterList.forEach(_item => {
              if (_item.brandName == brand[i])
                newArray.push(_item)
            });
          }
          this.filterCustomList = newArray;
          this.filteredCategoryList = newArray;
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
        else {
          const newArray = [];
          for (let i = 0; i < brand.length; i++) {
            this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed.forEach(_item => {
              if (_item.brandName == brand[i])
                newArray.push(_item)
            });
          }
          this.filterCustomList = newArray;
          this.filteredCategoryList = newArray;
          this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed = this.filteredCategoryList;
          return this.filteredCategoryList;
        }
      }
    }
  }


  sort(event: any) {
    switch (event.target.value) {

      case "Low":
        {
          this.filteredCategoryList = this.filteredCategoryList.sort((low, high) => (low.product_price ? low.product_price : low.product_price) - (high.product_price ? high.product_price : high.product_price));
        
          break;
        }

      case "High":
        {
          this.filteredCategoryList = this.filteredCategoryList.sort((low, high) => (high.product_price ? high.product_price : high.product_price) - (low.product_price ? low.product_price : low.product_price));
          break;
        }
      case "productName":
        {
          this.filteredCategoryList = this.filteredCategoryList.sort(function (low, high) {
            if (low.product_name ? low.product_name : low.product_name < high.product_name ? high.product_name : high.product_name) {
              return -1;
            }
            else if (low.product_name ? low.product_name : low.product_name > high.product_name ? high.product_name : high.product_name) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        this.filteredCategoryList = this.filteredCategoryList.sort((low, high) => (low.product_price ? low.product_price : low.product_price) - (high.product_price ? high.product_price : high.product_price));
        break;
      }

    }
    return this.filteredCategoryList;

  }

  SliderChange(minValue, maxValue) {
    if (minValue == this.minValue && maxValue == this.maxValue) {
      this.isSliderFilterisInitialized = true;
    }
    if (this.discountArray.length == 0 && this.brandNameArray.length == 0) {
      this.filteredCategoryList = this.categorieslist.filter(item => {
        return item.salesRate >= minValue && item.salesRate <= maxValue;
      })
      this.sliderFilterList = this.filteredCategoryList;
    }
    else {
      if (this.discountArray.length != 0 && this.brandNameArray.length == 0) {
        this.filteredCategoryList = this.filterCustomDiscountdList.filter(item => {
          return item.salesRate >= minValue && item.salesRate <= maxValue;
        })
      }
      else if (this.discountArray.length == 0 && this.brandNameArray.length != 0) {
        this.filteredCategoryList = this.filterCustomList.filter(item => {
          return item.salesRate >= minValue && item.salesRate <= maxValue;
        })
      }
      else {
        this.filteredCategoryList = this.filterAfterSliderChangedIfBeforethisAnotherFilterIsUsed.filter(item => {
          return item.salesRate >= minValue && item.salesRate <= maxValue;
        })
      }
    }
  }




  onAddProductToCart(product: any) {
  
      const item = {
        productId: product.menu_id ? product.menu_id : product.menu_id,
        productName: product.menu_name ? product.menu_name : product.menu_name,
        productPrice: product.price,
        quantity: 1,
        productImage: product.image,
        total: product.price ? product.price : product.price
      };
      this.detailToCart.addToCart(item);
   
  }
  onAddProductToCartsecond() {
   
      const item = {
        productId: this.selectedVariation.id,
        productName: this.selectedVariation.name,
        productPrice: this.selectedVariation.price,
        quantity: this.quantity ? this.quantity : 1,
        productImage: this.selectedVariation.mediaUrl ? this.selectedVariation.mediaUrl : this.selectedVariation.thumbnailImageUrl,
        total: this.selectedVariation.price * (this.quantity ? this.quantity : 1)
      };
      this.detailToCart.addToCart(item);


  }

  AddCompare(productId, productName, salesRate) {

    const item = {
      productId: productId,
      productName: productName,
      productPrice: salesRate,
      total: salesRate
    };
    this.compareService.addtocompare(item);
  }

  Collaps(index: number) {

    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    //some values  
  };
  Collaps2(index: number) {

    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    //some values  
  };
  Compare(compareitem: any) {
    this.compareService.addtocompare(compareitem);
  }

  onChangeImage(n: number): void {

    this.currentImage = this.categorieslist.imageUrl[n];
  }






}



