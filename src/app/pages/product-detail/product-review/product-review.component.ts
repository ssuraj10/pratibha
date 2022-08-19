import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ReviewService } from 'src/app/services/Review.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  ReviewForm: FormGroup;
  loading: boolean;
  error: any;
  productDetailId: any;
  currentRate = 0;
  public show: boolean = false;
  public buttonName: any = 'Leave a Review';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number=0;

  constructor(private ReviewApi: ReviewService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private alertify: AlertifyService,) { }

  ngOnInit() {
    this.productDetailId = this.router.snapshot.params.id;
    this.createForm();
  }

  createForm() {
    this.ReviewForm = this.formBuilder.group({

      productId: new FormControl(this.productDetailId, Validators.required),
      title: new FormControl('', Validators.required),
      reviewText: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.loading = true;
    this.ReviewForm.value.rating=this.selectedValue;
    this.ReviewApi.create(this.ReviewForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.alertify.success('One review added !');
          } else {
            this.alertify.error('Error !' + data.message);
          }
          this.ngOnInit();
          // this.router.navigate([this.returnUrl]);
        });

  }

  toggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Close";
    else
      this.buttonName = "Leave a Review";
  }

  onCancel() {
  
    this.selectedValue=0;
    this.ReviewForm.reset();
    
  }

  countStar(star) {
    this.selectedValue = star;
   
  }


}
