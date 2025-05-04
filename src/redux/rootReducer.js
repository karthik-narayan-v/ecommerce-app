import { combineReducers } from 'redux';
import productReducer from './product/productSlice';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
