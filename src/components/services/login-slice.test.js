import loginUserSlice, { loginUser } from '././login-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('loginUserSlice', () => {
  const initialState = {
    email: null,
    name: '',
    error: false,
    userAccess: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(loginUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = loginUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userAccess: false,
      error: false,
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@yandex.ru', name: 'Test User' },
      accessToken: 'Bearer test-access-token',
      refreshToken: 'test-refresh-token',
    };
    const action = { type: loginUser.fulfilled.type, payload: mockResponse };
    const state = loginUserSlice(initialState, action);

    expect(state).toEqual({
      email: 'test@yandex.ru',
      name: 'Test User',
      error: false,
      userAccess: true,
    });

    // Проверяем, что токены сохранены в localStorage
    expect(localStorage.getItem('accessToken')).toBe('test-access-token');
    expect(localStorage.getItem('refreshToken')).toBe('test-refresh-token');
  });

  it('should handle loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type };
    const state = loginUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
      userAccess: false,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@yandex.ru', name: 'Test User' },
      accessToken: 'Bearer test-access-token',
      refreshToken: 'test-refresh-token',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const loginData = { email: 'test@yandex.ru', password: 'password123' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await loginUser(loginData)(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(loginData),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const loginData = { email: 'test@yandex.ru', password: 'password123' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await loginUser(loginData)(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: loginUser.rejected.type,
      })
    );
  });
});