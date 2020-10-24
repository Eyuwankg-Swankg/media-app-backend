import {
  GET_POSTS,
  LOADING,
  LOADED,
  ADD_LIKE,
  ADD_DISLIKE,
} from "../actions/types";
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

export const addLike = async (dispatch, id, token, index) => {
  const a = await axios
    .patch(
      `http://localhost:5000/post/like/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .catch((err) => console.log("axios error", err));
  dispatch({
    type: ADD_LIKE,
    payload: {
      index,
      post: a.data,
    },
  });
  return;
};

export const addDislike = async (dispatch, id, token, index) => {
  const a = await axios
    .patch(
      `http://localhost:5000/post/dislike/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .catch((err) => console.log("axios error", err));
  dispatch({
    type: ADD_DISLIKE,
    payload: {
      index,
      post: a.data,
    },
  });
  return;
};
