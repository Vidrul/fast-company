import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookMarksReducer from "./bookMark";
import commentsReducer from "./comments";
import professionReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionReducer,
    users: usersReducer,
    comments: commentsReducer,
    bookMarks: bookMarksReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
