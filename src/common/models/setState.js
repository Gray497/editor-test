export default {
  state: {
  },
  effects: {
  },
  reducers: {
    updateRedux(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
