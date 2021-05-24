import { productConstants } from "../constants";

const INITIALSTATE = {
  products: [],
};

export const productReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
      
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        products: action.payload.products,
      });

    default:
      return state;
  }
};
