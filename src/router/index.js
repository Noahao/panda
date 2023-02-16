import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// ��ת���ظ�·��
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
import {addRoute} from '@/util/routerConfig'
/*
�ض�����ҳ ���
��ǰ������ͼ< 1000
����ת�� h5 ��ҳ
������תpc ��ҳ
*/

let routes = [
  {
    path: '/',
    meta: {
      title: '��ҳ',
    },
    redirect: () => ({ path: `${window.innerWidth < 1200 ? 'h5' : 'pc'}` }),
  },
  // ����·��404ҳ��
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/404',
    meta: {
      title: '404',
    },
    name: 'IndexHome404',
    component: () => import('@/views/404/index.vue'),
  },
]

// ��̬����base
function getAbsolutePath() {
  let path = location.pathname
  let subs = path.substr(0,3)
  if (subs === '/jp') {
    return '/jp/'
  }
  if (subs === '/cn') {
    return '/cn/'
  }
  if (subs === '/en') {
    return '/en/'
  }
  return '/cn/'
}

const router = new VueRouter({
  base: getAbsolutePath(),
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})
// ��̬��Ӷ�����·��
addRoute(router)
/**
 * ����·��ǰ
 * to: Route: ����Ҫ�����Ŀ�� ·�ɶ���
 * from: Route: ��ǰ������Ҫ�뿪��·��
 * next: Function: һ��Ҫ���ø÷����� resolve �������
 */
router.beforeEach((to, from, next) => {
  if (localStorage.siteCode === 'site757910' && !window.location.href.includes('/cn')) {
    window.location.href = '/cn'
  }
  if (localStorage.siteCode === 'site376781' && !window.location.href.includes('/en')) {
    window.location.href = '/en'
  }
  if (localStorage.siteCode === 'site199825' && !window.location.href.includes('/jp')) {
    window.location.href = '/jp'
  }
  // ��ȡҳ�����
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
