/**
 * @file ��ҳ���ݴ洢
 */
export default {
  namespaced: true, //���������ռ�
  state: {
    indexNumState: '', // ��¼�ڼ���
    backHome: false // �Ƿ���
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
