export interface ProductDetail {
    id: number;
    parentGroupedProductId: number;
    vendorsId: number;
    vendors: null;
    isApproved: true;
    price: number;
    oldPrice: number;
    specialPrice: number;
    specialPriceStart: number;
    specialPriceEnd: number;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    name: string;
    slug: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    sku: string;
    gtin: string;
    shortDescription: string;
    description: string;
    specification: string;
    isPublished: boolean;
    isFeatured: boolean;
    stockTrackingIsEnabled: boolean;
    attributes: attributesmodel[];
    option: optionsmodel[];
    productImages: string[];
    categoryIds: string[];
    thumbnailImageUrl:string;
    stockQuantity:number;
    quantity?: number;
}
export interface attributesmodel {
    id: number;
    name: string;
    values: attributesmodelvalue[];
}
export interface attributesmodelvalue {
    id: number;
    value: string;
}

export interface optionsmodel {
    id: number;
    value: string;
    displayType: number;
    values: optionsmodelvalue[];
}
export interface optionsmodelvalue {
    id: number;
    value: string;
    display: string;
    displayOrder: number;
    mediaId: number;
    mediaUrl: string;
    isDefault: boolean;
}

export interface ProductImagemodel {
    id: number;
    productId: number;
    caption: string;
    displayOrder: number;
    mediaId: number;
    mediaUrl: string;
}

export interface cartItem{
    productId?:number;
    quantity:number;
}