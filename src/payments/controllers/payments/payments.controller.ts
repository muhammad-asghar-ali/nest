import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDTO } from 'src/payments/dto/createPayment.dto';
import { PaymentsService } from 'src/payments/services/payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly _svc: PaymentsService,
  ) {}
  @Get()
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;

    if (!count || !page) {
      return response.status(400).json({
        msg: 'missing count count or page in a query',
      });
    }
    response.status(200).json({ msg: 'success' });
  }

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDTO) {
    const response = await this._svc.createPayment(createPaymentDto);
    return response;
  }
}
