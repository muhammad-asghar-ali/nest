import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
