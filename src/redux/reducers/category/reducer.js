export const reducers = {
  allCategory: (state, { payload }) => {
    state.allCategoryList = payload
  },

  allSubCategory: (state, { payload }) => {
    state.allSubCategoryList = payload
  }
}
