import { SIGNIN, SIGNUP, LOGGEDIN } from "../actions/types";
const initialState = {
  token: "",
  data: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGEDIN:
      return {
        ...state,
        token: action.payload.token,
        data: action.payload.data,
      };
    default:
      return state;
  }
}
