import { SIGNIN, SIGNUP, LOGGEDIN } from "../actions/types";
const initialState = {
  token:
    "Nodejs eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTMyNDBjNjg0NzljMDk0ODk3NzhmYiIsIm5hbWUiOiJleXV3YW5rZyIsImVtYWlsIjoiZXl1d2Fua2dAZ21haWwuY29tIiwiaWF0IjoxNjAzODIwMzkxLCJleHAiOjE2MDM4MjM5OTF9.5rrgD2Sk__cyXHaLt3HZyZ6ZuX4RkD5ySNbr80IX21I",
  data: {
    profilePic: "../public/user.png",
    gender: "",
    _id: "5f93240c68479c09489778fb",
    name: "eyuwankg",
    email: "eyuwankg@gmail.com",
    date: "2020-10-23T18:42:20.338Z",
    __v: 0,
  },
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
