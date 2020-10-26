import { SIGNIN, SIGNUP, LOGGEDIN } from "../actions/types";
const initialState = {
  token:
    "Nodejs eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTMyZWQ0ODA5YWFlMmQwNDA2ZDFiMCIsIm5hbWUiOiJrYXJ0aGlrIiwiZW1haWwiOiJrYXJ0aGlrQGdtYWlsLmNvbSIsImlhdCI6MTYwMzczODU0OCwiZXhwIjoxNjAzNzQyMTQ4fQ.tMR-gKqVxGKzmlDgY7GKl8LGIYZic4GRKo0SAoEiEU0",
  data: {
    profilePic: "../public/user.png",
    gender: "",
    _id: "5f932ed4809aae2d0406d1b0",
    name: "karthik",
    email: "karthik@gmail.com",
    date: "2020-10-23T19:28:20.714Z",
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
