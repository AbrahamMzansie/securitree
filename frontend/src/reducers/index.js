import { authReducer } from "../reducers/authReducer";
import { hierarchyReducer } from "../reducers/hierarchyReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  hierarchy: hierarchyReducer,
});

export default rootReducer;
