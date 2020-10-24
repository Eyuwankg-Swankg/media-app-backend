import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
