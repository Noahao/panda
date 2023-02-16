import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 跳转了重复路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
import {addRoute} from '@/util/routerConfig'
/*
重定向首页 如果
当前窗口视图< 1000
则跳转至 h5 首页
否则跳转pc 首页
*/

let routes = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    redirect: () => ({ path: `${window.innerWidth < 1200 ? 'h5' : 'pc'}` }),
  },
  // 错误路由404页面
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

// 动态设置base
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
// 动态添加多语言路由
addRoute(router)
/**
 * 进入路由前
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子
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
  // 获取页面标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
