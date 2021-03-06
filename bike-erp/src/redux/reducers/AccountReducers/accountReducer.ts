import {
  IS_AUTHENTICATED_SUCCESS,
  IS_AUTHENTICATED_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types/AccountTypes/accountTypes";

// Reducer for account, it handles the setting of states
const initialState = {
  loading: true,
  authenticated: false,
  error: "",
  account: undefined
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        authenticated: action.authenticated,
        account: action.payload
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
        authenticated: action.authenticated,
      };
    case LOGOUT:
      return {
        loading: false,
        authenticated: action.authenticated,
      };
    case IS_AUTHENTICATED_SUCCESS:
      return {
        loading: false,
        authenticated: action.authenticated,
        account: action.payload
      };
    case IS_AUTHENTICATED_FAILURE:
      return {
        loading: false,
        authenticated: action.authenticated
      };
    default:
      return state;
  }
};

export default reducer;
