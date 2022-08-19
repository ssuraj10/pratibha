import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-rating-andreview',
  templateUrl: './rating-andreview.component.html',
  styleUrls: ['./rating-andreview.component.css']
})
export class RatingAndreviewComponent implements OnInit {
  reviews: any;
  reviewslength: any;

  constructor(public dashboardService: DashboardService,) { }

  ngOnInit(): void {
    this. getallreviews();
  }
  getallreviews() {
    this.dashboardService.getRatings().pipe(first()).subscribe(data => {

      this.reviews = data;
      if(data){
        this.reviewslength=data.length;
      }
      
    });
  }
  delete(id: number) {
    const conf = confirm('Are you sure you want to delete?');
    if (conf === true) {
      this.dashboardService.deleteRating(id)
        .pipe(first())
        .subscribe(() => this.getallreviews());
      alert('Id number ' + JSON.stringify(id) + ' has been deleted !');
      window.location.reload();
    } else {
      alert('Delete unsuccesful');
    }
  }
}
