import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./initialState"
import { reducers } from "../../reducers/models/reducer"

// Slice
const slice = createSlice({ name: "models", initialState, reducers })

// Reducer
export default slice.reducer

// Actions
export const { allModels } = slice.actions
