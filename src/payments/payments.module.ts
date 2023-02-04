import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments/payments.controller';

@Module({
  controllers: [PaymentsController]
})
export class PaymentsModule {}
