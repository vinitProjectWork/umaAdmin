import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./initialState"
import { reducers } from "../../reducers/todo/reducers"

// Slice
const slice = createSlice({ name: "todo", initialState, reducers })

// Reducer
export default slice.reducer

// Actions
export const {
  // System Settings
  setSystemSettings
} = slice.actions
