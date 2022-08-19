import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SimpleProductWidget } from './simpleProductWidget.model';
import * as fromRoot from '../../../app.reducer';
import * as SimpleProductWidgetActions from './simpleProductWidget.actions';


export const SimpleProductWidgetFeatureKey = 'SimpleProductWidget';

export interface SimpleProductWidgetState extends EntityState<SimpleProductWidget> {
    // additional entities state properties
    error: any;
    selectedProductId: number | null;
    selectedproduct: any,

}

export interface AppState extends fromRoot.AppState {
    SimpleProductWidgets: SimpleProductWidgetState;
}

export const SimpleProductWidgetAdapter: EntityAdapter<SimpleProductWidget> = createEntityAdapter<SimpleProductWidget>();

export const initialState: SimpleProductWidgetState = SimpleProductWidgetAdapter.getInitialState({
    // additional entity state properties
    error: undefined,
    selectedProductId: null,
    selectedproduct:{}
});


export function SimpleProductWidgetReducer(
    state = initialState,
    action: SimpleProductWidgetActions.Actions
): SimpleProductWidgetState {
    switch (action.type) {
        case SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS_SUCCESS: {
            return SimpleProductWidgetAdapter.setAll(action.payload, {
                ...state,
            });
        }
        case SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS_FAIL: {
            return {
                ...state,
                entities: {},
                error: action.payload
            };
        }
        case SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET_SUCCESS: {
            return SimpleProductWidgetAdapter.addOne(action.payload, {
                ...state,
                selectedProductId: action.payload.id,
                selectedProduct: action.payload,
            });
        }
        case SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        default: {
            return state;
        }

    }
}

const getSimpleProductWidgetFeatureState = createFeatureSelector<SimpleProductWidgetState>(
    'SimpleProductWidgets'
  );

  export const getSimpleProductWidgets = createSelector(
    getSimpleProductWidgetFeatureState,
    SimpleProductWidgetAdapter.getSelectors().selectAll
  );
  export const getCurrentproductId = createSelector(
    getSimpleProductWidgetFeatureState,
    (state: SimpleProductWidgetState) => state.selectedProductId
  );
  export const getCurrentOption = createSelector(
    getSimpleProductWidgetFeatureState,
    getCurrentproductId,
    state => state.selectedproduct
  );