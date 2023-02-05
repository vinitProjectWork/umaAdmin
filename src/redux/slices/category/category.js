import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./initialState"
import { reducers } from "../../reducers/category/reducer"

// Slice
const slice = createSlice({ name: "category", initialState, reducers })

// Reducer
export default slice.reducer

// Actions
export const {
  // System Settings
  allCategory,
  allSubCategory,
} = slice.actions
