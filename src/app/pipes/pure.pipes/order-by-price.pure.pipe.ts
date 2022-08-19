
import {Order} from '../order';

export const orderByPricePurePipe = (products: any[], order?: Order): any[] => {
  if (!order) { return products; }

  if (order === Order.ASC) {
    return products.slice().sort((el1, el2) => el1.price - el2.price);
  } else {
    return products.slice().sort((el1, el2) => el2.price - el1.price);
  }
}
