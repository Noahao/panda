/**
 * @file 首页数据存储
 */
export default {
  namespaced: true, //开启命名空间
  state: {
    menuListStore: [], // 导航
    activeCode: '', // 点击active
    font: '', // 点击语言文字
    indexNumState: '',
    backHome: false
  },
  mutations: {
    addMenuList(state, value) {
      state.menuListStore = value
    },
    addActive(state, value) {
      state.activeCode = value
    },
    addIndexNum(state, value) {
      state.indexNumState = value
    },
    addBackHome(state, value) {
      state.backHome = value
    },
    addFont(state, value) {
      if(value === '繁體中文') {
        sessionStorage.setItem('font', '繁體中文')
        document.getElementsByTagName('body')[0].style.fontFamily = 'MsYh'
      } else {
        sessionStorage.setItem('font', '')
        document.getElementsByTagName('body')[0].style.fontFamily = ''
      }
      state.font = value
    },
  },
  actions: {},
}
