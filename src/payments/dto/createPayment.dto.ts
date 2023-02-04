import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
