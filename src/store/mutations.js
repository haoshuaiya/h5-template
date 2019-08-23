import types from "./actionTypes";
export default {
  // 关闭loading
  [types.CLOSE_LOADING](state) {
    state.loading = false;
  },
  // 打开loading
  [types.OPEN_LOADING](state) {
    state.loading = true;
  },
  // 登出
  [types.LOG_OUT]() {
    // localStorage.clear();
  }
};
