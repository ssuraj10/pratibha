import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { first } from 'rxjs/operators';
import { AddressService } from 'src/app/services/Address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address-block',
  templateUrl: './delivery-address-block.component.html',
  styleUrls: ['./delivery-address-block.component.css']
})
export class DeliveryAddressBlockComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  error: any;
  constructor(private fb: FormBuilder,
              private alertify: AlertifyService,
              private restApi: AddressService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      contactName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      stateOrProvinceId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      districtId: new FormControl('', Validators.required),
      isDefault: new FormControl(true, Validators.required),
    });
  }

  onSubmit() {
    this.loading = true;
    this.alertify.confirm('Are you sure you want to add?', () => {
      this.restApi.create(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertify.success('One record added !');
            this.ngOnInit();
          },
          error => {
            this.error = error;
            this.alertify.error(this.error);
            this.loading = false;
          });
    });
  }
}
