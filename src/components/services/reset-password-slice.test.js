import resetPasswordSlice, { resetPasswordPost } from './reset-password-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

// Мок для fetch
fetchMock.enableMocks();

describe('resetPasswordSlice', () => {
  const initialState = {
    message: '',
    loading: false,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle initial state', () => {
    expect(resetPasswordSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle resetPasswordPost.pending', () => {
    const action = { type: resetPasswordPost.pending.type };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should handle resetPasswordPost.fulfilled', () => {
    const action = { type: resetPasswordPost.fulfilled.type };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle resetPasswordPost.rejected', () => {
    const action = { type: resetPasswordPost.rejected.type };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = { success: true, message: 'Password reset successful' };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const resetData = { password: 'newPassword123', token: 'resetToken123' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await resetPasswordPost(resetData)(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(resetData),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const resetData = { password: 'newPassword123', token: 'resetToken123' };
    const dispatch = jest.fn();
    const getState = jest.fn();

    await resetPasswordPost(resetData)(dispatch, getState, undefined);

    // Проверяем, что dispatch был вызван с rejected действием
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: resetPasswordPost.rejected.type,
      })
    );
  });
});