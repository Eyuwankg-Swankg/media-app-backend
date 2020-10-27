import {
  GET_POSTS,
  LOADING,
  LOADED,
  ADD_LIKE,
  ADD_DISLIKE,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
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
    payload: a.data,
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
    payload: a.data,
  });
  return;
};

export const deletePostAction = (dispatch, id, token) => {
  axios
    .delete(`http://localhost:5000/post/delete/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((posts) => {
      dispatch({
        type: DELETE_POST,
        payload: posts.data,
      });
    })
    .catch((err) => console.log("Axios Error", err));
  return;
};

export const addCommentAction = (dispatch, id, token, text) => {
  const a = axios
    .patch(
      `http://localhost:5000/post/comment/${id}`,
      { text },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((posts) => {
      dispatch({
        type: ADD_COMMENT,
        payload: posts.data,
      });
    })
    .catch((err) => console.log("Error ", err));
  return;
};

export const deleteCommentAction = (dispatch, token, postId, id) => {
  axios
    .delete(
      `http://localhost:5000/post/delcomment/${postId}/${id}`,
      
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((posts) => dispatch({ type: DELETE_COMMENT, payload: posts.data }))
    .catch((err) => console.log("Error ", err));
};
