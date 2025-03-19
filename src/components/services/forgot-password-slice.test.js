import forgotPasswordSlice, { forgotPasswordPost } from './forgot-password-slice';
import { BASE_URL } from '../../../utils/burgerApi';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('forgotPasswordSlice', () => {
  const initialState = {
    message: '',
    loading: false,
    error: false,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle initial state', () => {
    expect(forgotPasswordSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle forgotPasswordPost.pending', () => {
    const action = { type: forgotPasswordPost.pending.type };
    const state = forgotPasswordSlice(initialState, action);
    expect(state).toEqual({
      message: '',
      loading: true,
      error: false,
    });
  });

  it('should handle forgotPasswordPost.fulfilled', () => {
    const mockResponse = { success: true, message: 'Reset email sent' };
    const action = { type: forgotPasswordPost.fulfilled.type, payload: mockResponse };
    const state = forgotPasswordSlice(initialState, action);
    expect(state).toEqual({
      message: 'Reset email sent',
      loading: false,
      error: false,
    });
  });

  it('should handle forgotPasswordPost.rejected', () => {
    const errorMessage = 'Network error';
    const action = { type: forgotPasswordPost.rejected.type, payload: errorMessage };
    const state = forgotPasswordSlice(initialState, action);
    expect(state).toEqual({
      message: 'Network error',
      loading: false,
      error: true,
    });
  });

  it('should handle forgotPasswordPost.rejected with default error message', () => {
    const action = { type: forgotPasswordPost.rejected.type, payload: undefined };
    const state = forgotPasswordSlice(initialState, action);
    expect(state).toEqual({
      message: 'An error occurred',
      loading: false,
      error: true,
    });
  });

  it('should call fetch with correct arguments', async () => {
    const mockResponse = { success: true, message: 'Reset email sent' };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const email = 'test@example.com';
    const dispatch = jest.fn();
    const getState = jest.fn();

    await forgotPasswordPost({ email })(dispatch, getState, undefined);

    expect(fetchMock).toHaveBeenCalledWith(BASE_URL + '/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email }),
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const email = 'test@example.com';
    const dispatch = jest.fn();
    const getState = jest.fn();

    await forgotPasswordPost({ email })(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: forgotPasswordPost.rejected.type,
        payload: 'Network error',
      })
    );
  });
});