import ingredientsSlice, {
    getIngredients,
    setPriceIngTotal,
    setPriceBunTotal,
    setPriceClear,
  } from './ingredients';
  import { BASE_URL } from '../../../utils/burgerApi';
  import fetchMock from 'jest-fetch-mock';

  const URL_FOR_INGREDIENTS = BASE_URL + "/ingredients";
  
  // Мок для fetch
  fetchMock.enableMocks();
  
  describe('ingredientsSlice', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: false,
      priceIngTotal: 0,
      priceBunTotal: 0,
    };
  
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    it('should handle initial state', () => {
      expect(ingredientsSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle getIngredients.pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: false,
      });
    });
  
    it('should handle getIngredients.fulfilled', () => {
      const mockResponse = {
        success: true,
        data: [
          {
            _id: '1',
            name: 'Test Ingredient 1',
            type: 'main',
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            calories: 100,
            price: 50,
            image: 'image_url',
            image_mobile: 'image_mobile_url',
            image_large: 'image_large_url',
            __v: 0,
          },
          {
            _id: '2',
            name: 'Test Ingredient 2',
            type: 'bun',
            proteins: 5,
            fat: 3,
            carbohydrates: 40,
            calories: 200,
            price: 30,
            image: 'bun_image_url',
            image_mobile: 'bun_image_mobile_url',
            image_large: 'bun_image_large_url',
            __v: 0,
          },
        ],
      };
      const action = { type: getIngredients.fulfilled.type, payload: mockResponse };
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({
        ingredients: mockResponse.data,
        loading: false,
        error: false,
        priceIngTotal: 0,
        priceBunTotal: 0,
      });
    });
  
    it('should handle getIngredients.rejected', () => {
      const action = { type: getIngredients.rejected.type };
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: true,
        loading: false,
      });
    });
  
    it('should handle setPriceIngTotal', () => {
      const action = setPriceIngTotal(100);
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        priceIngTotal: 100,
      });
    });
  
    it('should handle setPriceBunTotal', () => {
      const action = setPriceBunTotal(200);
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        priceBunTotal: 200,
      });
    });
  
    it('should handle setPriceClear', () => {
      const stateWithPrices = {
        ...initialState,
        priceIngTotal: 100,
        priceBunTotal: 200,
      };
      const action = setPriceClear();
      const state = ingredientsSlice(stateWithPrices, action);
      expect(state).toEqual({
        ...initialState,
        priceIngTotal: 0,
        priceBunTotal: 0,
      });
    });
  
    it('should call fetch with correct arguments', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            _id: '1',
            name: 'Test Ingredient 1',
            type: 'main',
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            calories: 100,
            price: 50,
            image: 'image_url',
            image_mobile: 'image_mobile_url',
            image_large: 'image_large_url',
            __v: 0,
          },
        ],
      };
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
  
      const dispatch = jest.fn();
      const getState = jest.fn();
  
      await getIngredients()(dispatch, getState, undefined);
  
      expect(fetchMock).toHaveBeenCalledWith(URL_FOR_INGREDIENTS);
    });
  
    it('should handle fetch error', async () => {
      fetchMock.mockRejectOnce(new Error('Ошибка при загрузке ингредиентов'));
  
      const dispatch = jest.fn();
      const getState = jest.fn();
  
      await getIngredients()(dispatch, getState, undefined);
  
      // Проверяем, что dispatch был вызван с rejected действием
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: getIngredients.rejected.type,
        })
      );
    });
  });