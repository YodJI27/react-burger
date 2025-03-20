import getUserSlice, { authUser, checkUserAuth } from './get-user-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('getUserSlice', () => {
  const initialState = {
    email: '',
    name: '',
    message: '',
    loading: false,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(getUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle authUser.pending', () => {
    const action = { type: authUser.pending.type };
    const state = getUserSlice(initialState, action);
    expect(state).toEqual({
      email: '',
      name: '',
      message: '',
      loading: true,
      error: false,
    });
  });

  it('should handle authUser.fulfilled', () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@example.com', name: 'Test User' },
    };
    const action = { type: authUser.fulfilled.type, payload: mockResponse };
    const state = getUserSlice(initialState, action);
    expect(state).toEqual({
      email: 'test@example.com',
      name: 'Test User',
      message: '',
      loading: false,
      error: false,
    });
  });

  it('should handle authUser.rejected with error message', () => {
    const errorMessage = 'Network error';
    const action = { type: authUser.rejected.type, payload: errorMessage };
    const state = getUserSlice(initialState, action);
    expect(state).toEqual({
      email: '',
      name: '',
      message: 'Network error',
      loading: false,
      error: true,
    });
  });

  it('should handle authUser.rejected with default error message', () => {
    const action = { type: authUser.rejected.type, payload: undefined };
    const state = getUserSlice(initialState, action);
    expect(state).toEqual({
      email: '',
      name: '',
      message: 'Ошибка при загрузке данных пользователя',
      loading: false,
      error: true,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = {
      success: true,
      user: { email: 'test@example.com', name: 'Test User' },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    localStorage.setItem('accessToken', 'test-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await authUser()(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer test-token',
      },
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    localStorage.setItem('accessToken', 'test-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await authUser()(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: authUser.rejected.type,
        payload: 'Network error',
      })
    );
  });

  describe('checkUserAuth', () => {
    it('should return false if no access token is present', () => {
      expect(checkUserAuth()).toBe(false);
    });

    it('should return true if access token is present', () => {
      localStorage.setItem('accessToken', 'test-token');
      expect(checkUserAuth()).toBe(true);
    });
  });
});