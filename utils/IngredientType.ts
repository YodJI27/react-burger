

export interface IIngredientPropTypes {
    _id: string,
    name: string
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
};


export interface Order {
    _id: string;
    createdAt: string;
    ingredients: [];
    name: string;
    number: number;
    status: 'created' | 'pending' | 'done';
    updatedAt: string;
}

export interface WebSocketActionTypes {
    connect: string;
    disconnect: string;
    send: string;
    onOpen: string;
    onMessage: string;
    onError: string;
    onClose: string;
  }
  
  export interface WebSocketPayload {
    url: string;
    onMessageAction: string;
    onErrorAction: string;
  }