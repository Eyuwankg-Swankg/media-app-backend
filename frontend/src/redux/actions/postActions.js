import { GET_POSTS, LOADING, LOADED } from "../actions/types";
import axios from "axios";
export const getPosts = async (dispatch, token) => {
  dispatch({ type: LOADING });
  const a = await axios
    .get("http://localhost:5000/post", {
      headers: {
        Authorization: token,
      },
    })
    .catch((err) => console.log("axios error", err));
  dispatch({ type: GET_POSTS, payload: a ? a.data : [] });
  dispatch({ type: LOADED });
};
