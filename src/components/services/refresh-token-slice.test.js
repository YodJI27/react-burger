import refreshTokenSlice, { refreshToken } from './refresh-token-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('refreshTokenSlice', () => {
  const initialState = {
    access: false,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(refreshTokenSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle refreshToken.pending', () => {
    const action = { type: refreshToken.pending.type };
    const state = refreshTokenSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      access: false,
      error: false,
    });
  });

  it('should handle refreshToken.fulfilled', () => {
    const mockResponse = {
      success: true,
      accessToken: 'Bearer test-access-token',
      refreshToken: 'test-refresh-token',
    };
    const action = { type: refreshToken.fulfilled.type, payload: mockResponse };
    const state = refreshTokenSlice(initialState, action);

    expect(state).toEqual({
      access: true,
      error: false,
    });

    // Проверяем, что токены сохранены в localStorage
    expect(localStorage.getItem('accessToken')).toBe('test-access-token');
    expect(localStorage.getItem('refreshToken')).toBe('test-refresh-token');
  });

  it('should handle refreshToken.rejected', () => {
    const action = { type: refreshToken.rejected.type };
    const state = refreshTokenSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
      access: false,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      accessToken: 'Bearer test-access-token',
      refreshToken: 'test-refresh-token',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    localStorage.setItem('refreshToken', 'test-refresh-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await refreshToken()(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/token', {
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

    await refreshToken()(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: refreshToken.rejected.type,
      })
    );
  });
});