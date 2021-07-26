import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import formReducer from "./form/reducer";
import postReducer from "./post/reducer";
import chatReducer from "./chat/reducer";
import scoreReducer from "./score/reducer";
import favouriteReducer from "./favourite/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  post: postReducer,
  chat: chatReducer,
  score: scoreReducer,
  favourite: favouriteReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
