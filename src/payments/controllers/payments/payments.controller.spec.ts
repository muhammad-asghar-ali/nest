import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
    query: {},
  } as unknown as Request;

  const statusMockResponse = {
    json: jest.fn((a) => a),
  };

  const responseMock = {
    status: jest.fn((x) => statusMockResponse),
    json: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENT_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENT_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('payments service should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return status of 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusMockResponse.json).toHaveBeenCalledWith({
        msg: 'missing count count or page in a query',
      });
    });

    it('should return status of 200', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusMockResponse.json).toHaveBeenCalledWith({
        msg: 'success',
      });
    });
  });

  describe('createPayment', () => {
    // it('should return a successful response', async () => {
    //   const response = await controller.createPayment({
    //     email: 'test@email.com',
    //     price: 100,
    //   });
    //   expect(response).toStrictEqual({ status: 'success' });
    // });
    it('should throw an error', async () => {
      jest
        .spyOn(paymentsService, 'createPayment')
        .mockImplementationOnce(() => {
          throw new BadRequestException();
        });
      try {
        const response = await controller.createPayment({
          email: 'test@email.com',
          price: 100,
        });
      } catch (err) {
        console.log('error');
      }
    });
  });
});
