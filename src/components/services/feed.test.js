import getFeedSlice, {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
  } from './feed';
  
  describe('getFeedSlice', () => {
    const initialState = {
      connected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    };
  
    it('should handle initial state', () => {
      expect(getFeedSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle wsConnecting', () => {
      const actual = getFeedSlice(initialState, wsConnecting());
      expect(actual.connected).toBe(true);
    });
  
    it('should handle wsOpen', () => {
      const actual = getFeedSlice(initialState, wsOpen());
      expect(actual.connected).toBe(true);
      expect(actual.error).toBeNull();
    });
  
    it('should handle wsClose', () => {
      const stateWithConnection = { ...initialState, connected: true };
      const actual = getFeedSlice(stateWithConnection, wsClose());
      expect(actual.connected).toBe(false);
    });
  
    it('should handle wsError', () => {
      const errorMessage = 'Connection error';
      const actual = getFeedSlice(initialState, wsError(errorMessage));
      expect(actual.error).toBe(errorMessage);
    });
  
    it('should handle wsMessage', () => {
      const mockResponse = {
        success: true,
        orders: [
          { id: 1, ingredients: ['ing1', 'ing2'], status: 'done', number: 123 },
          { id: 2, ingredients: ['ing3', 'ing4'], status: 'pending', number: 124 },
        ],
        total: 100,
        totalToday: 10,
      };
      const actual = getFeedSlice(initialState, wsMessage(mockResponse));
      expect(actual.orders).toEqual(mockResponse.orders);
      expect(actual.total).toBe(mockResponse.total);
      expect(actual.totalToday).toBe(mockResponse.totalToday);
    });
  });