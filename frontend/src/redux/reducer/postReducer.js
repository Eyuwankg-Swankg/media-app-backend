import {
  GET_POSTS,
  LOADING,
  LOADED,
  ADD_DISLIKE,
  ADD_LIKE,
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
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
