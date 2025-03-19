import patchUserSlice, { patchUser } from './patch-user-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('patchUserSlice', () => {
  const initialState = {
    loading: false,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(patchUserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle patchUser.pending', () => {
    const action = { type: patchUser.pending.type };
    const state = patchUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should handle patchUser.fulfilled', () => {
    const action = { type: patchUser.fulfilled.type };
    const state = patchUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle patchUser.rejected', () => {
    const action = { type: patchUser.rejected.type };
    const state = patchUserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = { success: true };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const userData = { name: 'Test User', email: 'test@example.com' };
    localStorage.setItem('accessToken', 'test-access-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await patchUser(userData)(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer test-access-token',
      },
      body: JSON.stringify(userData),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const userData = { name: 'Test User', email: 'test@example.com' };
    localStorage.setItem('accessToken', 'test-access-token');

    const dispatch = jest.fn();
    const getState = jest.fn();

    await patchUser(userData)(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: patchUser.rejected.type,
      })
    );
  });
});