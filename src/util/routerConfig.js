import H5Router from '@/router/routerList/H5Router'
import PCRouter from '@/router/routerList/PCRouter'
import H5RouterEnglish from '@/router/routerList/H5RouterEnglish'
import PCRouterEnglish from '@/router/routerList/PCRouterEnglish'
import H5RouterJapanese from '@/router/routerList/H5RouterJapanese'
import PCRouterJapanese from '@/router/routerList/PCRouterJapanese'

// 设置路由
export function addRoute(routes) {
  if (routes.options.base === '/en/') {
    localStorage.setItem('siteCode', 'site376781')
  }
  if (routes.options.base === '/cn/') {
    localStorage.setItem('siteCode', 'site757910')
  }
  if (routes.options.base === '/jp/') {
    localStorage.setItem('siteCode', 'site199825')
  }
  const siteCode = localStorage.getItem('siteCode')
  // 动态添加多语言路由
  switch (siteCode) {
  case 'site376781':
    [...H5RouterEnglish, ...PCRouterEnglish].forEach((item) => {
      routes.addRoute(item)
    })
    break
  case 'site199825':
    [...H5RouterJapanese, ...PCRouterJapanese].forEach((item) => {
      routes.addRoute(item)
    })
    break
  default:
    [...H5Router, ...PCRouter].forEach((item) => {
      routes.addRoute(item)
    })
    break
  }
}
// 语言切换
export function routeCodeJump(option) {
  if (option.siteCode === 'site757910') {
    window.location.href = '/cn'
  }
  if (option.siteCode === 'site376781') {
    window.location.href = '/en'
  }
  if (option.siteCode === 'site199825') {
    window.location.href = '/jp'
  }
}

// 页面刷新相互跳转逻辑
export function pageJump() {
  const hash = location.href
  if (window.innerWidth < 1200 && hash.includes('/pc')) {
    const result = hash.replace('/pc', '/h5')
    if (result && !hash.includes('/h5')) {
      location.replace(result)
    }
  }
  if (window.innerWidth > 1200 && hash.includes('/h5')) {
    const result = hash.replace('/h5', '/pc')
    if (result && !hash.includes('/pc')) {
      location.replace(result)
    }
  }
}