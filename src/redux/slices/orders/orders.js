import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { reducers } from "../../reducers/orders/reducer";

// Slice
const slice = createSlice({ name: "orders", initialState, reducers });

// Reducer
export default slice.reducer;

// Actions
export const { allOrdersDump } = slice.actions;
