export const reducers = {
  allBrands: (state, { payload }) => {
    state.allBrandList = payload
  },
  allBrandsDump: (state, { payload }) => {
    state.allBrandsDump = payload
  }
}
