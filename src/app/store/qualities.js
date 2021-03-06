import { createSlice } from "@reduxjs/toolkit";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true
    }
});

const { reducer: qualitiesReducer } = qualitiesSlice;

const loadQualitiesList = () => async (dispatch) => {};

export default qualitiesReducer;
