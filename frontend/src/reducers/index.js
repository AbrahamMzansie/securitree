import { authReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { hierarchyReducer } from "../reducers/hierarchyReducer";
import { productReducer } from "../reducers/productReducer";

import {pageReducer} from "../reducers/pageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  hierarchy: hierarchyReducer,
  page : pageReducer,
});

export default rootReducer;
