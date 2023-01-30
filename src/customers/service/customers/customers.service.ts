import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  getCustomers() {
    return [
      {
        id: 1,
        email: 'test@email.com',
        createdAt: new Date(),
      },
    ];
  }
}
