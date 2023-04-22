import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';
import * as CustomerActions from 'src/app/customer/store/action/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  customers: Customer[];
}

export const initialState: CustomerState = {
  customers: [],
};

export const reducer = createReducer(
  initialState,
  on(CustomerActions.addCustomers, (state: CustomerState, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
  }))
);
