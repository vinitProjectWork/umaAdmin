import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./initialState"
import { reducers } from "../../reducers/product/reducer"

// Slice
const slice = createSlice({ name: "product", initialState, reducers })

// Reducer
export default slice.reducer

// Actions
export const {
  // System Settings
  addProduct,
  addMedia,
  addMediaId,
  allProductList,
  allProductMedia
} = slice.actions
