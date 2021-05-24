import { userConstants } from "../constants";
const INITIALSTATE = {
  error: null,
  message: null,
  loading: false,
};

export const userReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
      });
    case userConstants.USER_REGISTER_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        message: action.payload.message,
      });

    case userConstants.USER_REGISTER_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
};
