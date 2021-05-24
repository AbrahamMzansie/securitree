import { pageConstants } from "../constants";

const INITIALSTATE = {
  page: {},
  error: null,
  loading: false,
  pages: [],
};

export const pageReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case pageConstants.PAGE_REQUEST:
      return (state = {
        ...state,
        loading: true,
        error: null,
      });

    case pageConstants.PAGE_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        page : action.payload.page,
      });

    case pageConstants.PAGE_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
};
