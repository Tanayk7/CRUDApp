import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "./loginTypes";

const initialState = {
  loading: false,
  authenticated: false,
  session_token: "",
  email: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        session_token: action.payload.session_token,
        email: action.payload.email,
        authenticated: true,
        loading: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        authenticated: false,
        email: "",
      };
    default:
      return state;
  }
};

export default reducer;
