import getOrderDataSlice, { getOrderData } from './info-order';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('getOrderDataSlice', () => {
  const initialState = {
    order: {
      _id: '',
      number: 0,
      createdAt: '',
      ingredients: [],
      name: '',
      status: 'pending',
      updatedAt: '',
    },
    loading: true,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle initial state', () => {
    expect(getOrderDataSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle getOrderData.pending', () => {
    const action = { type: getOrderData.pending.type };
    const state = getOrderDataSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should handle getOrderData.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          number: 123,
          createdAt: '2023-10-01T12:00:00Z',
          ingredients: ['ing1', 'ing2'],
          name: 'Test Order',
          status: 'done',
          updatedAt: '2023-10-01T12:30:00Z',
        },
      ],
    };
    const action = { type: getOrderData.fulfilled.type, payload: mockResponse };
    const state = getOrderDataSlice(initialState, action);
    expect(state).toEqual({
      order: mockResponse.orders[0],
      loading: false,
      error: false,
    });
  });

  it('should handle getOrderData.rejected', () => {
    const action = { type: getOrderData.rejected.type };
    const state = getOrderDataSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          number: 123,
          createdAt: '2023-10-01T12:00:00Z',
          ingredients: ['ing1', 'ing2'],
          name: 'Test Order',
          status: 'done',
          updatedAt: '2023-10-01T12:30:00Z',
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const orderNumber = 123;
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getOrderData(orderNumber)(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + `/orders/${orderNumber}`);
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const orderNumber = 123;
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getOrderData(orderNumber)(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getOrderData.rejected.type,
      })
    );
  });
});