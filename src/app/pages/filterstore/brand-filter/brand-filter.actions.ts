export enum BrandFilterActionTypes {
    ADD_BRAND_TO_FILTER = 'ADD_BRAND_TO_FILTER',
    REMOVE_BRAND_FROM_FILTER = 'REMOVE_BRAND_FROM_FILTER',
    CLEAR_BRAND_FILTER = 'CLEAR_BRAND_FILTER'
  }

export class AddBrandToFilter {
  readonly type = BrandFilterActionTypes.ADD_BRAND_TO_FILTER;

  constructor(public payload: string) {
  }
}

export class RemoveBrandFromFilter {
  readonly type = BrandFilterActionTypes.REMOVE_BRAND_FROM_FILTER;

  constructor(public payload: string) {
  }
}

export class ClearBrandFilter {
  readonly type = BrandFilterActionTypes.CLEAR_BRAND_FILTER;

  constructor() {
  }

}

export type BrandFilterActions = AddBrandToFilter | RemoveBrandFromFilter | ClearBrandFilter;

  