import { createSlice } from "@reduxjs/toolkit";
import professionService from "../service/profession.service";
import { isOutDated } from "../utils/isOutDated";

const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReseved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailde: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;

const { professionsRequestFailde, professionsReseved, professionsRequested } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;

    if (isOutDated(lastFetch)) {
        try {
            dispatch(professionsRequested());
            const { content } = await professionService.get();
            dispatch(professionsReseved(content));
        } catch (error) {
            dispatch(professionsRequestFailde(error.message));
        }
    }
};

export const getProfessionsList = () => (state) => state.professions.entities;
export const getProfessionsLoadStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
    return state.professions.entities.find((p) => p._id === id);
};

export default professionReducer;
