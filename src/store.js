import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateAdminReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productListReducer: productListReducer,
  productDetailsReducer: productDetailsReducer,
  cart: cartReducer,
  userLoginReducer: userLoginReducer,
  userRegisterReducer: userRegisterReducer,
  userDetailsReducer: userDetailsReducer,
  userUpdateProfileReducer: userUpdateProfileReducer,
  orderCreateReducer: orderCreateReducer,
  orderDetailsReducer: orderDetailsReducer,
  orderPayReducer: orderPayReducer,
  orderMyListReducer: orderMyListReducer,
  userListReducer: userListReducer,
  userDeleteReducer: userDeleteReducer,
  userUpdateAdminReducer: userUpdateAdminReducer,
  productDeleteReducer: productDeleteReducer,
  productCreateReducer: productCreateReducer,
  productUpdateReducer: productUpdateReducer,
  orderListReducer: orderListReducer,
  orderDeliverReducer:orderDeliverReducer,
  productCreateReviewReducer:productCreateReviewReducer,
  productTopRatedReducer:productTopRatedReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLoginReducer: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
