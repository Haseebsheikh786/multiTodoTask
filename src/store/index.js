import { combineReducers } from "redux";
import taskReducer from "./crudReducer";

const rootReducer = combineReducers({
    todos: taskReducer,
});

export default rootReducer;
