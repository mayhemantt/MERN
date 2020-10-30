import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
