import { authConstants } from "../constants";
const INITIALSTATE = {
  token: null,
  error: null,
  user: {
    firtName: "",
    lastName: "",
    email: "",
  },
  authenticate: false,
  authenticating: false,
  error: null,
  message: null,
  loading: false,
};

export const authReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return (state = {
        ...state,
        error: null,
        authenticating: true,
        loading: true,
      });
    case authConstants.LOGIN_SUCCESS:
      return (state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      });
    case authConstants.LOGIN_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case authConstants.LOGOUT_REQUEST:
      return (state = {
        ...state,
        error: null,
        loading: true,
      });
    case authConstants.LOGOUT_SUCCESS:
      return (state = {
        ...INITIALSTATE,
      });
    case authConstants.LOGOUT_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
};
