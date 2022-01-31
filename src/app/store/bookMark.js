import { createAction, createSlice } from "@reduxjs/toolkit";
import bookMarkService from "../service/bookMark.service";

const bookMarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        bookMarksRequested: (state) => {
            state.isLoading = true;
        },
        bookMarksReseved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        bookMarksRequestFailde: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        bookMarkAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        bookMarkremoved: (state, action) => {
            state.entities = state.entities.filter(
                (m) => m._id !== action.payload
            );
        }
    }
});

const { reducer: bookMarksReducer, actions } = bookMarksSlice;
const {
    bookMarkAdded,
    bookMarksRequestFailde,
    bookMarksReseved,
    bookMarksRequested,
    bookMarkremoved
} = actions;

const addBookMarkRequested = createAction("bookmarks/addBookMarkRequested");
const removeBookMarkRequested = createAction(
    "bookmarks/removeBookMarkRequested"
);

export const loadbookMarksList = (userId) => async (dispatch) => {
    try {
        dispatch(bookMarksRequested());
        const { content } = await bookMarkService.getBookMarks(userId);
        dispatch(bookMarksReseved(content ? content : []));
    } catch (error) {
        dispatch(bookMarksRequestFailde(error.message));
    }
};

export const removeBookMark = (id) => async (dispatch) => {
    try {
        dispatch(removeBookMarkRequested());
        const { content } = await bookMarkService.remove(id);
        if (content === null) dispatch(bookMarkremoved(id));
    } catch (error) {
        dispatch(bookMarksRequestFailde(error.message));
    }
};

export const addBookMark = (payload) => async (dispatch) => {
    try {
        dispatch(addBookMarkRequested());
        const { content } = await bookMarkService.add(payload);
        dispatch(bookMarkAdded(content));
    } catch (error) {
        dispatch(bookMarksRequestFailde(error.message));
    }
};

export const getBookMarksById = (id) => (state) => {
    if (state.bookMarks.entities) {
        return state.bookMarks.entities.find((b) => b.userId === id);
    }
};

export const getBookMarksList = () => (state) => state.bookMarks.entities;
export const getBookMarksLoadingStatus = () => (state) =>
    state.bookMarks.isLoading;

export default bookMarksReducer;
