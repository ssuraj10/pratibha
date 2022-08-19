import * as Store from 'src/app/Store';
import { Product } from 'src/app/models/product';




export interface ProductState {
  loading: boolean;
  loaded: boolean;
  product: Product[];
}

export interface AppState extends Store.AppState {
  product: ProductState;
}
