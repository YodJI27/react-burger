import ordersUserSlice, {
    wsConnectingProfile,
    wsOpenProfile,
    wsCloseProfile,
    wsErrorProfile,
    wsMessageProfile,
  } from './order-user';
  
  describe('ordersUserSlice', () => {
    const initialState = {
      connected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    };
  
    it('should handle initial state', () => {
      expect(ordersUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle wsConnectingProfile', () => {
      const action = wsConnectingProfile();
      const state = ordersUserSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        connected: true,
      });
    });
  
    it('should handle wsOpenProfile', () => {
      const action = wsOpenProfile();
      const state = ordersUserSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        connected: true,
        error: null,
      });
    });
  
    it('should handle wsCloseProfile', () => {
      const stateWithConnection = { ...initialState, connected: true };
      const action = wsCloseProfile();
      const state = ordersUserSlice(stateWithConnection, action);
      expect(state).toEqual({
        ...initialState,
        connected: false,
      });
    });
  
    it('should handle wsErrorProfile', () => {
      const errorMessage = 'Connection error';
      const action = wsErrorProfile(errorMessage);
      const state = ordersUserSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
      });
    });
  
    it('should handle wsMessageProfile', () => {
      const mockResponse = {
        success: true,
        orders: [
          {
            _id: '1',
            ingredients: ['ing1', 'ing2'],
            status: 'done',
            name: 'Order 1',
            number: 123,
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:30:00Z',
          },
          {
            _id: '2',
            ingredients: ['ing3', 'ing4'],
            status: 'pending',
            name: 'Order 2',
            number: 124,
            createdAt: '2023-10-01T13:00:00Z',
            updatedAt: '2023-10-01T13:30:00Z',
          },
        ],
        total: 100,
        totalToday: 10,
      };
      const action = wsMessageProfile(mockResponse);
      const state = ordersUserSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orders: mockResponse.orders,
        total: mockResponse.total,
        totalToday: mockResponse.totalToday,
      });
    });
  });