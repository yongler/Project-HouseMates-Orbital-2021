import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import formReducer from "./form/reducer";
import postReducer from "./post/reducer";
import chatReducer from "./chat/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  post: postReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
