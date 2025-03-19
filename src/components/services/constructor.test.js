import constructorSlice, {
    setConstructor,
    setBunIngredients,
    setDeleteIngredient,
    setDragConstructor,
    setClearData,
  } from './constructor';
  
  describe('constructorSlice', () => {
    const initialState = {
      constructor: [],
      bun: null,
    };
  
    const mockIngredient = {
      _id: '1',
      name: 'Ingredient 1',
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
  
    const mockBun = {
      _id: '2',
      name: 'Bun',
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
    };
  
    it('should handle initial state', () => {
      expect(constructorSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setConstructor', () => {
      const actual = constructorSlice(initialState, setConstructor(mockIngredient));
      expect(actual.constructor).toEqual([mockIngredient]);
    });
  
    it('should handle setBunIngredients', () => {
      const actual = constructorSlice(initialState, setBunIngredients(mockBun));
      expect(actual.bun).toEqual(mockBun);
    });
  
    it('should handle setDeleteIngredient', () => {
      const stateWithIngredient = {
        constructor: [mockIngredient],
        bun: null,
      };
      const actual = constructorSlice(stateWithIngredient, setDeleteIngredient(0));
      expect(actual.constructor).toEqual([]);
    });
  
    it('should handle setDragConstructor', () => {
      const stateWithIngredients = {
        constructor: [mockIngredient, mockBun],
        bun: null,
      };
      const actual = constructorSlice(
        stateWithIngredients,
        setDragConstructor({ first: 0, second: 1 })
      );
      expect(actual.constructor).toEqual([mockBun, mockIngredient]);
    });
  
    it('should handle setClearData', () => {
      const stateWithData = {
        constructor: [mockIngredient],
        bun: mockBun,
      };
      const actual = constructorSlice(stateWithData, setClearData());
      expect(actual.constructor).toEqual([]);
      expect(actual.bun).toBeNull();
    });
  });