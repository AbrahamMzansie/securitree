import { authConstants } from "../constants";
import axiosInstance from "../helpers/axios";
import { exception } from "../Exceptions";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const response = await axiosInstance.post(`/admin/signin`, {
        ...user,
      });

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAIL,
          payload: "",
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGOUT_REQUEST });
      const response = await axiosInstance.post("/admin/signout");
      if (response.status === 200 || response.status === 201) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGOUT_FAIL,
        payload: exception(error),
      });
    }
  };
};
