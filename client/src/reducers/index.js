import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";
import { drawerReducer } from "./drawerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});

export default rootReducer;
