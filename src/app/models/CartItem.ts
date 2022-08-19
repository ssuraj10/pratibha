import { Item } from './Item';

export interface CartItem {
   id: number,
   couponCode: null,
   couponValidationErrorMessage: null,
   discount: number,
   discountString:string,
   shippingAmount: null,
   shippingAmountString:number,
   subTotal: number,
   subTotalString:number,
   checkedSubTotal: number,
   checkedSubTotalString:number,
   orderTotal: number,
   orderTotalString:number,
   checkedOrderTotal: number,
   checkedOrderTotalString:number,
   subCount: number,
   checkedSubCount: number,
   orderNote: null,
   item:Item

}