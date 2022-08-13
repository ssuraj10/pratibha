import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/services/items.service';
import { CartService } from '../shared/services/cart.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

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
  selectedFood: any;
  items: any[] = [];
  category: any = [];
  canBeAdded: any;
  displayModal: boolean;
  displayDetail: boolean = false;
  dialogitem: any;
  constructor(
    private itemService: ItemsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }
  category_name
  ngOnInit(): void {

    this.itemService.getAllCategory().subscribe((res: any) => {

      this.category = res.data
      console.log(res.data);

      console.log(this.category);

    });
    this.getitem(this.selectedItem)

  }
  getitem(id) {
    this.itemService.getItems(id).subscribe(data => {
      this.items = data.data;
    });
  }

  switchItem(key: any) {
    this.selectedItem = key;
    this.getitem(this.selectedItem)
  }

  findItem(itemName: string) {
    this.items = this.items.filter(item => item.name === itemName)
  }

  showItem(item: any) {
    console.log(item);
    this.selectedFood = item;

    Swal.fire({
      title: item.name,
      text: item.description,
      imageUrl: item.imagePath,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })


  }
  displayBasic: boolean=false;
  showBasicDialog(item) {
    this.dialogitem = item;
    this.displayBasic = true;
}

  addToCart(item: any) {
    this.selectedItem = item;
    const items = {
      menu_id:item.menu_id,
      set: 1,
      name: item.menu_name,
      price: Number(item.price)
    }
    this.cartService.addItem(items);
  }
}
