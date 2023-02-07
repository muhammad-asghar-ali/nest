import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/createCustomer.dto';
import { Customer } from '../../types/customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'test@email.com',
      name: 'test',
    },
    {
      id: 2,
      email: 'test1@email.com',
      name: 'test1',
    },
    {
      id: 3,
      email: 'test2@email.com',
      name: 'test2',
    },
    {
      id: 4,
      email: 'test3@email.com',
      name: 'test3',
    },
  ];
  // get all customers
  getCustomers() {
    return this.customers;
  }

  // get one customer
  getCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  // create customer
  createCustomer(customerDetails: CreateCustomerDto) {
    return this.customers.push(customerDetails);
  }
}
