const H5Router = [
  {
    path: '/h5',
    meta: {
      title: '首页',
      keepAlive: false,
    },
    name: 'H5home',
    component: () => import('@/views/H5/index/index.vue'),
  },
  {
    path: '/h5/baseDynamic',
    meta: {
      title: '基地动态',
      keepAlive: false,
    },
    name: 'BaseDynamic',
    component: () => import('@/views/H5/baseDynamic/index.vue'),
  },
  // 列表
  {
    path: '/h5/baseDynamic/list',
    meta: {
      title: '基地动态',
      keepAlive: false,
    },
    name: 'BaseDynamicList',
    component: () => import('@/views/H5/baseDynamicList/index.vue'),
  },
  {
    path: '/h5/touristService',
    meta: {
      title: '游客服务',
      keepAlive: false,
    },
    name: 'TouristService',
    component: () => import('@/views/H5/touristService/index.vue'),
  },
  {
    path: '/h5/research',
    meta: {
      title: '科研保护',
      keepAlive: false,
    },
    name: 'Research',
    component: () => import('@/views/H5/research/index.vue'),
  },
  {
    path: '/h5/animal',
    meta: {
      title: '动物之家',
      keepAlive: false,
    },
    name: 'AnimalHome',
    component: () => import('@/views/H5/animal/index.vue'),
  },
  {
    path: '/h5/education',
    meta: {
      title: '科普教育',
      keepAlive: false,
    },
    name: 'EducationHome',
    component: () => import('@/views/H5/education/index.vue'),
  },
  {
    path: '/h5/education/list',
    meta: {
      title: '科普教育',
      keepAlive: true,
    },
    name: 'EducationHomeList',
    component: () => import('@/views/H5/educationList/index.vue'),
  },
  {
    path: '/h5/pandaCulture',
    meta: {
      title: '熊猫文化',
      keepAlive: false,
    },
    name: 'PandaCulture',
    component: () => import('@/views/H5/pandaCulture/index.vue'),
  },
  // 列表
  // {
  //   path: '/h5/pandaCulture/list',
  //   meta: {
  //     title: '熊猫文化',
  //   },
  //   name: 'pandaCultureList',
  //   component: () => import('@/views/H5/pandaCultureList/index.vue'),
  // },
  {
    path: '/h5/cooperation',
    meta: {
      title: '对外合作',
      keepAlive: false,
    },
    name: 'Cooperation',
    component: () => import('@/views/H5/cooperation/index.vue'),
  },
  {
    path: '/h5/partyWork',
    meta: {
      title: '党建工作',
      keepAlive: false,
    },
    name: 'PartyWork',
    component: () => import('@/views/H5/partyWork/index.vue'),
  },
  {
    path: '/h5/partyWork/list',
    meta: {
      title: '党建建设',
      keepAlive: true,
    },
    name: 'PartyWorkLits',
    component: () => import('@/views/H5/partyWork/list.vue'),
  },
  {
    path: '/h5/pandaValley',
    meta: {
      title: '熊猫谷',
      keepAlive: false,
    },
    name: 'PandaValley',
    component: () => import('@/views/H5/pandaValley/index.vue'),
  },
  {
    path: '/h5/support',
    meta: {
      title: '爱心支持',
      keepAlive: false,
    },
    name: 'Support',
    component: () => import('@/views/H5/support/index.vue'),
  },
  {
    path: '/h5/about',
    meta: {
      title: '关于我们',
      keepAlive: false,
    },
    name: 'About',
    component: () => import('@/views/H5/about/index.vue'),
  },
  // 通用详情页
  {
    path: '/h5/details',
    meta: {
      title: '详情',
      keepAlive: false,
    },
    name: 'Details',
    component: () => import('@/views/H5/details/index.vue'),
  },
  // 通用列表
  {
    path: '/h5/generalList',
    meta: {
      title: '列表',
      keepAlive: false,
    },
    name: 'GeneralList',
    component: () => import('@/views/H5/generalList/index.vue'),
  },
]
// 抛出模块
export default H5Router
