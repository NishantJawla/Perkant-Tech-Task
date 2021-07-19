import {combineReducers} from "redux";
import userReducer from "./user-reducer/user.reducer";
import scoreReducer from "./score-reducer/score.reducer";
export default combineReducers({
    user: userReducer,
    score: scoreReducer
})