import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand'
})
export class BrandPipe implements PipeTransform {

  transform(products: any[], brand: string[]): any[] {
    console.log(products);
    console.log(brand);
    if (brand.length === 0) {
      return products;
    } else {
      const newArray = [];
      for (let i = 0; i < products.length; i++) {
        if (brand.some(data => data === products[i].brandName)) {
          newArray.push(products[i]);
        }
      }
      return newArray;
    }
  }

}
