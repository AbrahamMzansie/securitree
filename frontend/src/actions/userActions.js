import { userConstants } from "../constants";
import axiosInstance from "../helpers/axios";
import {exception} from "../Exceptions"
export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const response = await axiosInstance.post(`/admin/signup`, {
        ...user,
      });
      if (response.status === 200 || response.status === 201) {
        const { message } = response.data;
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: {
            message,
          },
        });
      } else {
        if (response.status === 400 || response.status === 401) {
          const { error } = response.data;
          dispatch({
            type: userConstants.USER_REGISTER_FAIL,
            payload: { error },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: userConstants.USER_REGISTER_FAIL,
        payload:exception(error),
      });
    }
  };
};
