export class Orders {
  id: number;
  no: number;
  customerId: number;
  customerName: number;
  shippingAddressId: number;
  billingAddressId: number;
  orderStatus: number;
  paymentType: number;
  shippingStatus: number;
  shippingMethod: number;
  shippingFeeAmount: number;
  paymentMethod: number;
  paymentFeeAmount: number;
  paymentOn: string;
  orderTotal: number;
  discountAmount: number;
  orderNote: string;
  adminNote: string;
  cancelReason: string;
  cancelOn: string;
  createdById: number;
  updatedById: number;
  createdOn: string;
  updatedOn: string;
}
