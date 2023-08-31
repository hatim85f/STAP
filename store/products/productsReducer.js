import { ADD_PRODUCT, GET_PRODUCTS } from "./productsActions";

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_PRODUCT:
      const newProduct = action.productData;
      return {
        ...state,
        products: state.products.concat(newProduct),
      };
    default:
      return state;
  }
};
