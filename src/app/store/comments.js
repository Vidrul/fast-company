import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../service/comment.service";

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReseved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailde: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentSlice;

const {
    commentsRequestFailde,
    commentsReseved,
    commentsRequested,
    commentCreated,
    commentRemoved
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    try {
        dispatch(commentsRequested());
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReseved(content));
    } catch (error) {
        dispatch(commentsRequestFailde(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested(payload));
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailde(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.deleteComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFailde(error.message));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsLoadStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
