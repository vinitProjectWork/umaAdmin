import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { reducers } from "../../reducers/sliderImage/reducer";

// Slice
const slice = createSlice({ name: "slider", initialState, reducers });

// Reducer
export default slice.reducer;

// Actions
export const { allSliderImage } = slice.actions;
