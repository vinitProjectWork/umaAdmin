import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./initialState"
import { reducers } from "../../reducers/brands/reducer"

// Slice
const slice = createSlice({ name: "brands", initialState, reducers })

// Reducer
export default slice.reducer

// Actions
export const { allBrands } = slice.actions
