import orderSlice, { createOrder } from './order';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('orderSlice', () => {
  const initialState = {
    order: null,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(orderSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      order: '- - - -',
    });
  });

  it('should handle createOrder.fulfilled', () => {
    const mockResponse = {
      success: true,
      order: { number: 12345 },
    };
    const action = { type: createOrder.fulfilled.type, payload: mockResponse };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      order: 12345,
    });
  });

  it('should handle createOrder.rejected with error message', () => {
    const errorMessage = 'Ошибка при создании заказа';
    const action = { type: createOrder.rejected.type, payload: errorMessage };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      order: 'Ошибка при создании заказа',
    });
  });

  it('should handle createOrder.rejected with default error message', () => {
    const action = { type: createOrder.rejected.type, payload: undefined };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      order: 'Ошибка при создании заказа',
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      order: { number: 12345 },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const orderData = ['ing1', 'ing2', 'ing3'];
    localStorage.setItem('accessToken', 'test-access-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await createOrder({ ingredients: orderData })(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer test-access-token',
      },
      body: JSON.stringify({ ingredients: orderData }),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const orderData = ['ing1', 'ing2', 'ing3'];
    localStorage.setItem('accessToken', 'test-access-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await createOrder({ ingredients: orderData })(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: createOrder.rejected.type,
        payload: 'Network error',
      })
    );
  });
});