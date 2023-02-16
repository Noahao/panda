/**
 * @file 首页数据存储
 */
export default {
  namespaced: true, //开启命名空间
  state: {
    indexNumState: '', // 记录第几屏
    backHome: false // 是否开启
  },
  mutations: {
    addIndexNum(state, value) {
      state.indexNumState = value
    },
    addBackHome(state, value) {
      state.backHome = value
    },
  },
  actions: {},
}
