export const reducers = {
  allSliderImage: (state, { payload }) => {
    state.sliderImage = [...payload];
  },
};
