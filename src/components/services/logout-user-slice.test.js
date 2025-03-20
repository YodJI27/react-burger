import logoutUserSlice, { logoutUser } from './logout-user-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('logoutUserSlice', () => {
  const initialState = {
    statusOut: false,
    errorOut: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(logoutUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = logoutUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      statusOut: false,
      errorOut: false,
    });
  });

  it('should handle logoutUser.fulfilled', () => {
    const mockResponse = { success: true, message: 'Logged out successfully' };
    const action = { type: logoutUser.fulfilled.type, payload: mockResponse };
    const state = logoutUserSlice(initialState, action);

    expect(state).toEqual({
      statusOut: true,
      errorOut: false,
    });

    // Проверяем, что токены удалены из localStorage
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  it('should handle logoutUser.rejected', () => {
    const action = { type: logoutUser.rejected.type };
    const state = logoutUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      errorOut: true,
      statusOut: false,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = { success: true, message: 'Logged out successfully' };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    localStorage.setItem('refreshToken', 'test-refresh-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await logoutUser()(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ token: 'test-refresh-token' }),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    localStorage.setItem('refreshToken', 'test-refresh-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await logoutUser()(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: logoutUser.rejected.type,
      })
    );
  });
});