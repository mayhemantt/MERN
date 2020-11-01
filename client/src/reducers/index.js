import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
});

export default rootReducer;
