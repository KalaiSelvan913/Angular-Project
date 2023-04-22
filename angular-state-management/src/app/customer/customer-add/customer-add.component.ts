import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/src';
import { Customer } from 'src/app/models/customer';
import { addCustomers } from '../store/action/customer.actions';
import { CustomerState } from '../store/reducer/customer.reducer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
  constructor(private store: Store<CustomerState>) {}

  ngOnInit(): void {}

  addCustomer(customerName: string) {
    const customer = new Customer();
    customer.name = customerName;
    this.store.dispatch(addCustomers(customer));
  }
}
