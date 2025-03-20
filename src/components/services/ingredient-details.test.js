import ingredientsDetailsSlice, {
    setIngredientsDetails,
    setOpenModalIngredients,
  } from './ingredient-details';
  
  describe('ingredientsDetailsSlice', () => {
    const initialState = {
      ingredientsDetails: null,
      open: false,
    };
  
    it('should handle initial state', () => {
      expect(ingredientsDetailsSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setIngredientsDetails', () => {
      const mockIngredient = {
        _id: '1',
        name: 'Test Ingredient',
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
      };
  
      const action = setIngredientsDetails(mockIngredient);
      const state = ingredientsDetailsSlice(initialState, action);
      expect(state).toEqual({
        ingredientsDetails: mockIngredient,
        open: false,
      });
    });
  
    it('should handle setOpenModalIngredients with true', () => {
      const action = setOpenModalIngredients(true);
      const state = ingredientsDetailsSlice(initialState, action);
      expect(state).toEqual({
        ingredientsDetails: null,
        open: true,
      });
    });
  
    it('should handle setOpenModalIngredients with false', () => {
      const action = setOpenModalIngredients(false);
      const state = ingredientsDetailsSlice(initialState, action);
      expect(state).toEqual({
        ingredientsDetails: null,
        open: false,
      });
    });
  });