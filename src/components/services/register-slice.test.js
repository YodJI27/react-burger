import registerUserSlice, { registerUser } from './register-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('registerUserSlice', () => {
  const initialState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    loading: false,
    error: false,
    message: '',
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle initial state', () => {
    expect(registerUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = registerUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    };
    const action = { type: registerUser.fulfilled.type, payload: mockResponse };
    const state = registerUserSlice(initialState, action);

    expect(state).toEqual({
      email: 'test@example.com',
      name: 'Test User',
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      loading: false,
      error: false,
      message: '',
    });
  });

  it('should handle registerUser.rejected with error message', () => {
    const errorMessage = 'Ошибка при регистрации';
    const action = { type: registerUser.rejected.type, payload: errorMessage };
    const state = registerUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
      loading: false,
      message: 'Ошибка при регистрации',
    });
  });

  it('should handle registerUser.rejected with default error message', () => {
    const action = { type: registerUser.rejected.type, payload: undefined };
    const state = registerUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
      loading: false,
      message: 'Ошибка при регистрации',
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const userData = { email: 'test@example.com', password: 'password123', name: 'Test User' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(userData)(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const userData = { email: 'test@example.com', password: 'password123', name: 'Test User' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(userData)(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: registerUser.rejected.type,
        payload: 'Network error',
      })
    );
  });
});