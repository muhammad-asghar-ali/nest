import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  customers = [
    {
      id: 1,
      email: 'test@email.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      email: 'test1@email.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      email: 'test2@email.com',
      createdAt: new Date(),
    },
    {
      id: 4,
      email: 'test3@email.com',
      createdAt: new Date(),
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
}
