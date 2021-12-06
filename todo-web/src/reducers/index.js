import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import retrieveReducer from "./retrieveReducer";

export default combineReducers({
    login:loginReducer,
    retrieve:retrieveReducer,
})