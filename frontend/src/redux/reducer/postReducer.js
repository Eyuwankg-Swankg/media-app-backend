import {
  GET_POSTS,
  LOADING,
  LOADED,
  ADD_DISLIKE,
  ADD_LIKE,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  AR_LIKE_COMMENT,
  AR_DISLIKE_COMMENT,
} from "../actions/types";
const initialState = {
  posts: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LOADING:
      return { ...state, isLoading: true };
    case LOADED:
      return { ...state, isLoading: false };
    case ADD_DISLIKE:
    case ADD_LIKE:
    case DELETE_POST:
    case ADD_COMMENT:
    case DELETE_COMMENT:
    case AR_LIKE_COMMENT:
    case AR_DISLIKE_COMMENT:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
