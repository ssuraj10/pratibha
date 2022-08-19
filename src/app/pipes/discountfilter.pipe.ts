import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountfilters',
  pure: false
})
export class DiscountfiltersPipe implements PipeTransform {

  transform(list: any, discountrangeUpperValue: any[] | undefined): any {
    let filter_list = list;
    let filterItem = [];
    // return filter_list = filter_list.filter(_item => {
    //   console.log("discount_filter");
    //   return  (discountrangeUpperValue-10<=_item .discountPercent) && (_item .discountPercent<=discountrangeUpperValue);
    // })
    if (discountrangeUpperValue.length==0) {
      return filter_list
    }
    else {
      for (let i = 0; i < discountrangeUpperValue.length; i++) {
        filter_list.forEach(_item => {
          if ((discountrangeUpperValue[i] - 10 <= _item.discountPercent) && (_item.discountPercent <= discountrangeUpperValue[i])) {
            filterItem.push(_item)
          }
        })
      }
      return filterItem;
    }
  }

}

