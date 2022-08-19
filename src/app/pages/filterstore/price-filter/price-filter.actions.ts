export enum PriceFilterTypes {
    ORDER_BY_ASC = 'ORDER_BY_ASC',
    ORDER_BY_DESC = 'ORDER_BY_DESC',
    CLEAR_ORDER_BY_PRICE = 'CLEAR_ORDER_BY_PRICE'
  }

export class OrderByAsc {
  readonly type = PriceFilterTypes.ORDER_BY_ASC;

  constructor() {
  }
}

export class OrderByDesc {
  readonly type = PriceFilterTypes.ORDER_BY_DESC;

  constructor() {

  }
}

export class ClearOrderBy {
  readonly type = PriceFilterTypes.CLEAR_ORDER_BY_PRICE;

  constructor() {
  }
}

export type PriceFilterActions = OrderByAsc | OrderByDesc | ClearOrderBy;
