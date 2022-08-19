import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CorderService } from 'src/app/services/corder.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  corders: any;
  coorderslength: any;
  page = 1;
  pageSize = 4;

  constructor(   private corder: CorderService,config: NgbRatingConfig,) {   config.max = 5;
    config.readonly = true;}

  ngOnInit(): void {
    this.getCorder();
  }
  getCorder() {
    this.corder.getAll().subscribe((data: any) => {

      this.corders = data;
     
      this.coorderslength = data.length;
    });
  }

}
