import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './createAddress.dto';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  // nested validation
  @IsNotEmptyObject()
  @ValidateNested() // Objects / object arrays marked with this decorator will also be validated.
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
