export interface Product {

    id: number,
    name: string,
    vendorsId: number,
    vendors: string,
    isApproved: boolean,
    hasOptions: boolean,
    isVisibleIndividually: boolean,
    createdOn: string,
    isPublished: boolean,
    isFeatured: boolean,
    isCallForPricing: boolean,
    isAllowToOrder: boolean,
    stockQuantity: string,
    price: number,
    mediaUrl: string


}
