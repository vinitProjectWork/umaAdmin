export const reducers = {
  addProduct: (state, { payload }) => {
    state.productDetails = payload
  },
  addMedia: (state, { payload }) => {
    state.productMedia = payload
  },
  addMediaId: (state, { payload }) => {
    state.mediaId = [...state.mediaId, payload]
  },
  allProductList: (state, { payload }) => {
    state.productList = [...payload]
  },
  allProductMedia: (state, { payload }) => {
    state.productMedias = [...payload]
  }
}
