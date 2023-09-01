import {
  ADD_PRODUCT,
  DELETE_ITEM,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "./productsActions";

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
    case EDIT_PRODUCT:
      const updatedProduct = action.product;
      const productIndex = state.products.findIndex(
        (item) => item._id === updatedProduct.productId
      );
      const newUpdatedProducts = [...state.products];
      newUpdatedProducts[productIndex] = updatedProduct;
      return {
        ...state,
        products: newUpdatedProducts,
      };
    case DELETE_ITEM:
      const updatedProducts = state.products.filter(
        (item) => item._id !== action.productId
      );
      return {
        ...state,
        products: updatedProducts,
      };
    default:
      return state;
  }
};
