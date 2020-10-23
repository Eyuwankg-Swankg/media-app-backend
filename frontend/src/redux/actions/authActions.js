import axios from "axios";
import { LOGGEDIN } from "./types";

export const signup = async (dispatch, data) => {
  var headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  };
  const a = await axios
    .post("http://localhost:5000/auth/register", data, headers)

    .catch((err) => console.log("axios error", err));
  if (a.data.msg) return a.data;
  else {
    dispatch({
      type: LOGGEDIN,
      payload: { token: a.data.token, data: a.data.data },
    });
    return;
  }
};
