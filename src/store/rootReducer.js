import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/usersSlice";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;