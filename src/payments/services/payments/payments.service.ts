import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/payments/dto/createPayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'test@email.com',
    },
    {
      email: 'test1@email.com',
    },
    {
      email: 'test2@email.com',
    },
  ];
  async createPayment(paymentDetails: CreatePaymentDTO) {
    const { email } = paymentDetails;
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return {
        id: 1,
        status: 'success',
      };
    }
    throw new BadRequestException();
  }
}
