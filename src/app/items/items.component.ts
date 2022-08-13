import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/services/items.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemTypes = [
    { name: 'All', type: 'all', imagePath: 'https://media.istockphoto.com/photos/various-plates-of-food-isolated-on-white-background-top-view-picture-id1058241232' },
    { name: 'Dinner', type: 'dinner', imagePath: 'https://media.istockphoto.com/photos/enjoying-dinner-with-friends-picture-id500516612' },
    { name: 'Dessert', type: 'dessert', imagePath: 'https://media.istockphoto.com/photos/fresh-cakes-picture-id497959594' },
    { name: 'Lunch', type: 'lunch', imagePath: 'https://media.istockphoto.com/photos/ready-to-serve-lunch-picture-id860534328' },
  ];

  public selectedItem = 1;
  items: any;
  canBeAdded: any;
  displayModal: boolean;

  constructor(
    private itemService: ItemsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
this.getItems();
  }

  getItems() {
    this.itemService.getmenu(this.selectedItem).subscribe((data: any) => {
      this.items = data.data;
    }, error => {

    });
  }

  switchItem(key: any) {
    this.selectedItem = key;
  }

  addToCart(item: any) {
    this.canBeAdded = this.cartService.addSingle(item);
    this.displayModal = !this.canBeAdded;
  }
}
