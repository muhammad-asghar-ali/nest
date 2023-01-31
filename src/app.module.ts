import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
