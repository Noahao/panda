/**
 * @file ��ҳ���ݴ洢
 */
export default {
  namespaced: true, //���������ռ�
  state: {
    menuListStore: [], // ����
    activeCode: '', // ���active
    font: '', // �����������
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
      if(value === '���w����') {
        sessionStorage.setItem('font', '���w����')
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
