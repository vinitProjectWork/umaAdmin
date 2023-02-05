import { configureStore } from "@reduxjs/toolkit"

import todo from "../slices/todo/todo"
import product from "../slices/product/product"
import category from "../slices/category/category"
import models from "../slices/models/models"
import brands from "../slices/brands/brands"

export const store = configureStore({
  reducer: {
    todo,
    product,
    category,
    models,
    brands
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
