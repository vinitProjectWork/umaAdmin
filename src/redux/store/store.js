import { configureStore } from "@reduxjs/toolkit";

import todo from "../slices/todo/todo";
import product from "../slices/product/product";
import category from "../slices/category/category";
import models from "../slices/models/models";
import brands from "../slices/brands/brands";
import slider from "../slices/slider/slider";
import users from "../slices/users/users";
import orders from "../slices/orders/orders";

export const store = configureStore({
  reducer: {
    todo,
    product,
    category,
    models,
    brands,
    slider,
    users,
    orders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
