import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../../dtos/createCustomer.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  // ParseIntPipe: convert string to number type
  // this is expressjs way with request and response objects
  @Get(':id')
  getCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(typeof id); // be default id is string
    const customer = this.customerService.getCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send({ msg: 'customer not found' });
    }
  }

  // this is nestjs way
  @Get('search/:id')
  getSearchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.getCustomerById(id);
    if (!customer)
      throw new HttpException('customer not found', HttpStatus.NOT_FOUND);
    return customer;
  }

  // post controller
  // add validation pipe
  @Post('create')
  @UsePipes(new ValidationPipe())
  createCustomer(@Body() createCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomer);
  }
}
