import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items = [
    { type: 'dinner', name: 'Thakali Khana Set', imagePath: 'https://media.istockphoto.com/photos/nepali-food-picture-id673844932', price: 8.00, set: 1 },
    { type: 'lunch', name: 'Chowmin', imagePath: 'https://media.istockphoto.com/photos/manchurian-hakka-schezwan-noodles-popular-indochinese-food-served-in-picture-id1144497787', price: 8.00, set: 1 },
    { type: 'dessert', name: 'Strawberry Pastry', imagePath: 'https://media.istockphoto.com/photos/strawberry-pastry-sweets-picture-id918118330', price: 3.00, set: 1 },
    { type: 'lunch', name: 'Samosa', imagePath: 'https://media.istockphoto.com/photos/vegetarian-samosas-with-chutney-picture-id181073533', price: 8.00, set: 1 },
    { type: 'dinner', name: 'Naan Set', imagePath: 'https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124', price: 6.00, set: 1 },
    { type: 'dessert', name: 'Chocolate Cake', imagePath: 'https://media.istockphoto.com/photos/chocolate-cake-with-bonbon-picture-id1035109138', price: 3.00, set: 1 },
    { type: 'lunch', name: 'Noodles', imagePath: 'https://media.istockphoto.com/photos/pad-thai-vegetarian-vegetables-udon-noodles-in-a-dark-background-top-picture-id926663774', price: 2.99, set: 1 },
    { type: 'dessert', name: 'Panna Cotta', imagePath: 'https://media.istockphoto.com/photos/delicious-panna-cotta-with-berries-picture-id182026106', price: 3.00, set: 1 },
    { type: 'dinner', name: 'Puri Tarkari', imagePath: 'https://media.istockphoto.com/photos/puri-tarkari-or-indian-fried-bread-with-vegetables-picture-id1166617768', price: 8.00, set: 1 },
    { type: 'dessert', name: 'Ice-cream', imagePath: 'https://media.istockphoto.com/photos/chocolate-ice-cream-in-a-glass-cup-picture-id936205852', price: 4.00, set: 1 },
    { type: 'dinner', name: 'Biryani', imagePath: 'https://media.istockphoto.com/photos/fish-biryani-with-basmati-rice-indian-food-picture-id488481490', price: 6.00, set: 1 },
    { type: 'lunch', name: 'Momo', imagePath: 'https://media.istockphoto.com/photos/japanese-dumplings-gyoza-with-pork-meat-and-vegetables-picture-id1133151212', price: 5.00, set: 1 }
  ];

  constructor(private http: HttpClient) { }

  rootURL = 'http://67.205.165.41/ofos/api';

  getItems(id): Observable<any> {
    return this.http.get(this.rootURL + `/menu.php?cat=${id}`).pipe(

      )
  }

  getAllCategory(){
   return  this.http.get(this.rootURL + '/category.php');
  }

  findItem(itemName: string){
    this.items = this.items.filter(item => item.name === itemName)
    return this.items.slice()
  }
}
