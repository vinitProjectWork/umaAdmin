import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { reducers } from "../../reducers/users/reducer";

// Slice
const slice = createSlice({ name: "users", initialState, reducers });

// Reducer
export default slice.reducer;

// Actions
export const { allUsersDump } = slice.actions;
