export const reducers = {
  allCategory: (state, { payload }) => {
    state.allCategoryList = payload
  },

  allCategoryDump: (state, { payload }) => {
    state.allCategoryDump = payload
  },

  allSubCategory: (state, { payload }) => {
    state.allSubCategoryList = payload
  },

  allSubCategoryDump: (state, { payload }) => {
    state.allSubCategoryDump = payload
  },

  audioSubCategory: (state, { payload }) => {
    state.audioSubCategory = payload
  },

  accessoriesSubCategory: (state, { payload }) => {
    state.accessoriesSubCategory = payload
  }
}
