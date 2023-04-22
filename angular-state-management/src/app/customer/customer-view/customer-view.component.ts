import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store/src';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { selectCustomers } from '../store/selector/customer.selectors';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  customers$!: Observable<Customer[]>;

  constructor(private store: Store) {
    this.customers$ = this.store.pipe(select(selectCustomers));
  }

  ngOnInit(): void {}
}
