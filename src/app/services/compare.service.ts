import { Injectable, EventEmitter } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  itemChanged = new EventEmitter<any>();
  compareItems = [];

  constructor(private local: LocalStoreService,
    private toastr: ToastrService) {
    const items = JSON.parse(localStorage.getItem('cartItem'));
    if (items) {
      for (let i = 0; i < items.length; i++) {
        this.compareItems.push(items[i]);
      }
    }
  }

  addtocompare(item) {
    if (!this.compareItems.some((value) => value.productName === item.productName)) {
      this.compareItems.push(item);
      this.local.setItem('CompareItems', this.compareItems);
      this.itemChanged.emit(this.compareItems);
      this.toastr.success('Item Added To Compare !');
    } else {
      this.toastr.error('Item Already In Compare !', 'Error');
    }
  }

  removeFromCompare(index) {
    this.compareItems.splice(index, 1);
    localStorage.setItem('CompareItems', JSON.stringify(this.compareItems));
    this.itemChanged.emit(this.compareItems);
    this.toastr.success('Item Removed !');
  }

  
}
