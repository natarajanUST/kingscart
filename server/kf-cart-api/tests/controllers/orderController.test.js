jest.resetModules();
let OrderModel, app;
jest.isolateModules(() => {
  jest.mock('../../src/models/Order');
  OrderModel = require('../../src/models/Order');
  app = require('../../src/app');
});
const request = require('supertest');
const { mockOrders } = require('../mocks/orderManagement.mock');

describe('Order Controller', () => { 
  let req, res, next;
  beforeEach(() => {
     jest.clearAllMocks();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();  // important
  });

  jest.setTimeout(15000);
  describe('Get All Orders', () => {
    it('should return 404 error when the order list is empty', async () => {
      OrderModel.getAllOrderDetails.mockResolvedValue([]);
      const response = await request(app).get('/api/order/getAllOrder');
      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toEqual({ message: 'Order not found' });
    });

    it('should return list of orders', async () => {
      OrderModel.getAllOrderDetails.mockResolvedValue(mockOrders);
      const response = await request(app).get('/api/order/getAllOrder');
      expect(response.status).toBe(200);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.length).toEqual(2);
    });
  });

  describe('Get Order By Id', () => {
    it('should return 404 error when the invalid orderId is supplied', async () => {
      OrderModel.getOrderDetailsById.mockResolvedValue(null);
      const response = await request(app).get('/api/order/getOrderById/123');
      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toEqual({ message: 'Order not found' });
    });

    it('should return list of orders', async () => {
      OrderModel.getOrderDetailsById.mockResolvedValue(mockOrders[0]);
      // OrderModel.getOrderDetailsById.mockImplementation(id => {
      // console.log('Mock getOrderDetailsById called with:', id);
      // return Promise.resolve(mockOrders[0]);
      //   });
      const response = await request(app).get(`/api/order/getOrderById/${mockOrders[0].id}`)
      expect(response.status).toBe(200);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.id).toEqual('4dfc777b-3b3f-47ec-8efa-eebef81b2154');
      expect(responseBody.custID).toEqual('123');
      expect(responseBody.status).toEqual('pending');
      expect(responseBody.amount).toEqual(100);
    });
  });

  describe('Create Order', () => {
   it('should return 400 error when order creation fails', async () => {
      OrderModel.createNewOrder.mockResolvedValue(null);
      const response = await request(app)
        .post('/api/order/save')
        .send({ custID: '789', status: 'pending', amount: 300 });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toEqual({ message: 'Order could not be created' });
    });
    it('should create a new order successfully', async () => {
      const newOrder = { id: '3', custID: '789', status: 'pending', amount: 300 };
      OrderModel.createNewOrder.mockResolvedValue(newOrder);
      const response = await request(app)
        .post('/api/order/save')
        .send(newOrder);
      expect(response.status).toBe(201);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toEqual(newOrder);
    });
  });

  describe('Cancel Order', () => {
    it('should return 404 error when order cancellation fails', async () => {
      OrderModel.updateOrder.mockResolvedValue(null);
      OrderModel.cancelOrder.mockResolvedValue({ id: mockOrders[0].id, reason: '569d2a2d-acad-4353-9c10-4b20b0a5b37e' });
      const response = await request(app)
        .post('/api/order/cancelOrder')
        .send({ orderId: mockOrders[0].id, reason: '569d2a2d-acad-4353-9c10-4b20b0a5b37e' });
      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text); 
      expect(responseBody).toEqual({ message: 'Order not found or cancellation failed' }); 
    });

    it('should cancel an order successfully', async () => {
      OrderModel.updateOrder.mockResolvedValue({ id: mockOrders[0].id, status: 'cancelled' });
      OrderModel.cancelOrder.mockResolvedValue({ id: mockOrders[0].id, reason: 'Customer request' });
      OrderModel.getOrderDetailsById.mockResolvedValue(mockOrders[0]);
      const response = await request(app)
        .post('/api/order/cancelOrder')
        .send({ orderId: mockOrders[0].id, reason: 'Customer request' });
      expect(response.status).toBe(200);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.id).toEqual(mockOrders[0].id);
    });
  });

  describe('Update Order Status', () => {
    it('should return 404 error when order status update fails', async () => {
      OrderModel.updateOrder.mockResolvedValue(null);
      const response = await request(app)
        .post('/api/order/updateStatus')
        .send({ orderId: mockOrders[0].id, status: 'completed' });
      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toEqual({ message: 'Order not found or update failed' });
    });

    it('should update order status successfully', async () => {
      OrderModel.updateOrder.mockResolvedValue({ id: mockOrders[0].id, status: 'completed' });
      const response = await request(app)
        .post('/api/order/updateStatus')
        .send({ orderId: mockOrders[0].id, status: 'completed' });
      expect(response.status).toBe(201);
      const responseBody = JSON.parse(response.text);
      console.log("Response Body:", responseBody);
      expect(responseBody.id).toEqual(mockOrders[0].id);
    });
  });
});