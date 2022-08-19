export class Corder{
        id: number;
        no: number;
        customerId: number;
        customerName: string;
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
        cancelReason: string;
        cancelOn: string;
        createdOn: string;
        updatedOn: string;
        orderStatusString: string;
        subTotal: number;
        subTotalString: string;
        address: Adress[];
}
export class Adress{
  id: number;
  contactName: string;
  phone: number;
  addressLine1: string;
  fullAddressLine1: string;
  zipCode: string;
  countryId: number;
  countryName: string;
  stateOrProvinceId: number;
  stateOrProvinceName: string;
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
}
