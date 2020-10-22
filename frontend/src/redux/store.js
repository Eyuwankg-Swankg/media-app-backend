import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";

const rootReducers = combineReducers(authReducer);

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
