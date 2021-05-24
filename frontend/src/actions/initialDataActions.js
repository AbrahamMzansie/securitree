import {
  categoryConstants,
  initialDataConstants,
  productConstants,
} from "../constants";
import { exception } from "../Exceptions";
import axiosInstance from "../helpers/axios";

export const getInitialData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST,
      });
      const response = await axiosInstance.post("/initialData");
      const { categories, products } = response.data;
      if (response.status === 200 || response.status === 2001) {
        dispatch({
          type: categoryConstants.FETCH_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCT_SUCCESS,
          payload: { products },
        });
      }
    } catch (error) {
      dispatch({
        type: categoryConstants.FETCH_ALL_CATEGORIES_FAIL,
        payload: exception(error),
      });
    }
  };
};
