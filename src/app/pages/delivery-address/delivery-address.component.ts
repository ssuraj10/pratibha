import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/Store';
import { SetCurrentUser } from 'src/app/Store/Action/auth.actions';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromDeliveryAddress from './store/delivery-address.reducer';
import * as fromDeliveryAddressActions from './store/delivery-address.actions';
import { UserAddress } from './store/delivery-address.model';
import { UseraddressService } from 'src/app/services/useraddress.service';
import { CountryService } from 'src/app/services/country.service';
import { Location } from './Location';
import { CheckoutPageComponent } from '../checkout-page/checkout-page.component';
@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit, AfterViewInit {

  item: any = {};
  country: any;
  satateOrProvince: any;
  district: any;
  city: any;
  latitude = 26.6716598;
  longitude = 87.6679765;
  zoom: number;
  address: string;
  countryModel: number;
  private geoCoder;
  deliveryUserAddressId: number;
  locationf: any = {};
  @ViewChild('search')
  public searchElementRef: ElementRef;
  datafromlocal: any = {};
  @ViewChild('confirmModal')
  public confirmModal: ElementRef;
  @ViewChild('locationPoint')
  public locationpoint: ElementRef;
  formBasic: FormGroup;
  currentLocation: string;
  checoutReload: CheckoutPageComponent;
  selectedAttributes: any;
  placedetail: google.maps.places.PlaceResult;
  selectedcity: any;
  selecteddistrict: any;
  userid: string;
  constructor(private fb: FormBuilder,
    private router: Router,
    private restApi: UseraddressService,
    private route: ActivatedRoute,
    private countryApi: CountryService,
    private localstorageforaddressService: LocalstorageforaddressService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<fromDeliveryAddress.AppState>,
    private modalService: NgbModal) {
    this.userid=localStorage.getItem('userId');

  }

  ngOnInit(): void {
    this.deliveryUserAddressId = this.route.snapshot.params.id;
    this.buildFormBasic();
    if (this.deliveryUserAddressId) {
      this.item = JSON.parse(localStorage.getItem('address'));
      this.buildFormBasic(this.item);
    } else {
      this.deliveryUserAddressId = 0;
      this.buildFormBasic(this.item);
    }
    this.setCurrentLocation();
    // this.datafromlocal = this.localstorageforaddressService.get('address');
    this.currentLocation = this.datafromlocal.name;
    this.formBasic.value.addressLine1 = this.currentLocation;

  }

  getItem(id: number) {
    return this.restApi.getOne(id)
      .subscribe(result => {
        this.item = result;
        this.currentLocation = this.item.addressLine1;
        this.buildFormBasic(this.item);
        this.findcountryIdEdit(this.item);
        this.findProvinceOrZoneEdit(this.item);
        this.findeDistrictEdit(this.item);
      });
  }



  private intialLocation() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.ngZone.run(() => {
        this.latitude = this.item.latitude;
        this.longitude = this.item.longitude;
        this.localstorageforaddressService.set('address', this.locationf);
        this.zoom = 12;
        this.buildFormBasic();
        this.landmarkLocation(this.confirmModal);
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
    else {
      this.zoom = 15;
      this.getAddress(this.latitude, this.longitude);
    }
  }

  private setCurrentLocationForClick() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
    else {
      this.zoom = 15;
      this.getAddress(this.latitude, this.longitude);
    }
  }



  markerDragEnd($event: MouseEvent) {
    console.log($event);

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.formBasic.value.latitude = this.latitude;
    this.formBasic.value.longitude = this.longitude;
    console.log(this.formBasic.value);
    if ($event) {
      this.getAddress(this.latitude, this.longitude);
      const geocoder = new google.maps.Geocoder;
      const latlng = { lat: this.latitude, lng: this.longitude };
      const that = this;
      geocoder.geocode({ location: latlng }, function (results) {
        if (results[0]) {
          that.zoom = 11;
          that.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
          this.locationf.name = that.currentLocation;
          this.locationf.latitude = this.latitude;
          this.locationf.longitude = this.longitude;
          this.localstorageforaddressService.set('address', this.locationf);
          console.log(this.locationf);
          this.formBasic.value.addressLine1 = this.currentLocation;
          this.formBasic.value.addressLine1 = this.currentLocation;
        } else {
          console.log('No results found');
        }
      });
    }
    else {
      this.getAddress(this.latitude, this.longitude);
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.currentLocation = results[0].formatted_address;
          this.locationf.name = this.currentLocation;
          this.locationf.latitude = this.latitude;
          this.locationf.longitude = this.longitude;
          this.localstorageforaddressService.set('address', this.locationf);
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  buildFormBasic(i: any = {}) {
    this.formBasic = this.fb.group({
      contactName: [i.contactName, Validators.required],
      phone: [i.phone, Validators.compose([Validators.required,
      Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/),
      ])],
      addressLine1: [i.addressLine1],
      countryId: [i.countryId, Validators.required],
      cityId: [i.cityId],
      districtId: [i.districtId, Validators.required],
      isDefault: [i.isDefault ? i.isDefault : 1],
      longitude: [i.longitude],
      latitude: [i.latitude],
      user_id: [this.userid],
      zip_code: [1],
    });
  }
  submit() {
    const formObject = <any>{};
    formObject.contactName= this.formBasic.value.contactName;
    formObject.addressLine1= this.currentLocation;
    formObject.phone= this.formBasic.value.phone;
    formObject.latitude= this.latitude;
    formObject.longitude= this.longitude;
    formObject.countryId= this.formBasic.value.countryId;
    formObject.cityId= this.formBasic.value.cityId;
    formObject.districtId= this.formBasic.value.districtId;
    formObject.isDefault= this.formBasic.value.isDefault;
    formObject.user_id= this.formBasic.value.user_id;
    formObject.zip_code= this.formBasic.value.zip_code;
    if (this.deliveryUserAddressId) {
      console.log(JSON.stringify(formObject))
      localStorage.setItem('address',JSON.stringify(formObject))
      // this.store.dispatch(new fromDeliveryAddressActions.CreateUserAddress(formObject));
      this.router.navigateByUrl('/Checkout');
      // this.restApi.edit(this.deliveryUserAddressId, this.formBasic.value).subscribe(data => {
      //   console.log(data);
      //   // this.checoutReload.getAddress();
      //   this.router.navigateByUrl('/Checkout');
      // });
    }
    else {
      console.log(JSON.stringify(formObject))
      localStorage.setItem('address',JSON.stringify(formObject))
      // this.store.dispatch(new fromDeliveryAddressActions.CreateUserAddress(formObject));
      this.router.navigateByUrl('/Checkout');
    }

  }

  get countryId() {
    return this.formBasic.get('countryId');
  }
  get stateOrProvinceId() {
    return this.formBasic.get('stateOrProvinceId');
  }
  get contactName() {
    return this.formBasic.get('contactName');
  }

  get districtId() {
    return this.formBasic.get('districtId');
  }
  get cityId() {
    return this.formBasic.get('cityId');
  }
  get phone() {
    return this.formBasic.get('phone');
  }

  get addressLine1() {
    return this.formBasic.get('addressLine1');
  }
  getAllCountry() {
    this.countryApi.getAll().subscribe(result => {
      this.country = result;
      var index = this.country.findIndex(x => x.id == 1);
      this.selectedAttributes = this.country[index].id;
      this.findcountryId(this.selectedAttributes);

      //       this.countryId.setValue = result[0].name;

    });
  }
  getAllcity() {
    this.countryApi.getAllcity().subscribe(result => {
      this.city = result.data;
      var index = this.city.findIndex(x => x.id == 1);
      this.selectedcity = this.city[index].id;

      //       this.countryId.setValue = result[0].name;

    });
  }
  getAllDistrict() {
    this.countryApi.getAlldistrict().subscribe(result => {
      this.district = result.data;
      var index = this.district.findIndex(x => x.id == 1);
      this.selecteddistrict = this.district[index].id;

      //       this.countryId.setValue = result[0].name;

    });
  }

  findcountryId(event) {

    this.countryApi.getProvincesByCountryId(event.id ? event.id : 1).subscribe(result => {
      this.satateOrProvince = result;
    });
  }

  findProvinceOrZone(event) {

    this.district = event.provinceChildren;
  }

  findeDistrict(event) {

    this.city = event.provinceChildren;
  }

  findcountryIdEdit(item) {
    return this.countryApi.getProvincesByCountryId(item.countryId).subscribe(result => {
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

    });
  }

  landmarkLocation(confirmModal) {
    this.modalService.open(confirmModal, { windowClass: 'custom-class' });

  }

  onCancel() {
    this.formBasic.reset();
    this.buildFormBasic();
  }


  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.name;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place);
          this.currentLocation = place.name;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formBasic.value.addressLine1 = place.name;
          this.locationf.name = place.name;
          this.locationf.latitude = this.latitude;
          this.locationf.longitude = this.longitude;
          this.localstorageforaddressService.set("address", this.locationf);
          console.log(this.latitude);
          this.zoom = 12;
          this.landmarkLocation(this.confirmModal)
        });
      });
    });
  }

  
}
