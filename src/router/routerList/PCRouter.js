const PCRouter = [  {    path: '/pc',    name: 'PCPChome',    meta: {      title: '首页',      keepAlive: false,    },    component: () => import('@/views/PC/index/home.vue'),  },  {    path: '/pc/home',    name: 'PCPChomeNew',    meta: {      title: '首页',      keepAlive: false,    },    component: () => import('@/views/PC/index/home.vue'),  },  {    path: '/pc/baseDynamic',    meta: {      title: '基地动态',      keepAlive: false,    },    name: 'PCBaseDynamic',    component: () => import('@/views/PC/baseDynamic/index.vue'),  },  // 列表  {    path: '/pc/baseDynamic/list',    meta: {      keepAlive: false,    },    name: 'PCBaseDynamicList',    component: () => import('@/views/PC/baseDynamicList/index.vue'),  },  {    path: '/pc/touristService',    meta: {      title: '游客服务',      keepAlive: false,    },    name: 'PCTouristService',    component: () => import('@/views/PC/touristService/index.vue'),  },  {    path: '/pc/research',    meta: {      title: '科研保护',      keepAlive: false,    },    name: 'PCResearch',    component: () => import('@/views/PC/research/index.vue'),  },  {    path: '/pc/animal',    meta: {      title: '动物之家',      keepAlive: false,    },    name: 'PCAnimalHome',    component: () => import('@/views/PC/animal/index.vue'),  },  {    path: '/pc/education',    meta: {      title: '科普教育',      keepAlive: false,    },    name: 'PCEducationHome',    component: () => import('@/views/PC/education/index.vue'),  },  {    path: '/pc/education/list',    meta: {      title: '科普教育',      keepAlive: false,    },    name: 'PCEducationList',    component: () => import('@/views/PC/educationList/index.vue'),  },  {    path: '/pc/pandaCulture',    meta: {      title: '熊猫文化',      keepAlive: false,    },    name: 'PCPandaCulture',    component: () => import('@/views/PC/pandaCulture/index.vue'),  },  // 列表  {    path: '/pc/pandaCulture/list',    meta: {      title: '熊猫文化',      keepAlive: false,    },    name: 'PCpandaCultureList',    component: () => import('@/views/PC/pandaCultureList/index.vue'),  },  {    path: '/pc/cooperation',    meta: {      title: '对外合作',      keepAlive: false,    },    name: 'PCCooperation',    component: () => import('@/views/PC/cooperation/index.vue'),  },  {    path: '/pc/partyWork',    meta: {      title: '党建工作',      keepAlive: false,    },    name: 'PCPartyWork',    component: () => import('@/views/PC/partyWork/index.vue'),  },  {    path: '/pc/partyWork/list',    meta: {      title: '党建建设',      keepAlive: false,    },    name: 'PartyWorkLits',    component: () => import('@/views/PC/partyWork/list.vue'),  },  {    path: '/pc/pandaValley',    meta: {      title: '熊猫谷',      keepAlive: false,    },    name: 'PCPandaValley',    component: () => import('@/views/PC/pandaValley/index.vue'),  },  {    path: '/pc/support',    meta: {      title: '爱心支持',      keepAlive: false,    },    name: 'PCSupport',    component: () => import('@/views/PC/support/index.vue'),  },  {    path: '/pc/about',    meta: {      title: '关于我们',      keepAlive: false,    },    name: 'PCAbout',    component: () => import('@/views/PC/about/index.vue'),  },  {    path: '/pc/pictureList',    meta: {      title: '图片列表',      keepAlive: false,    },    name: 'PCPictureList',    component: () => import('@/views/PC/pictureList/index.vue'),  },  // 通用详情页  {    path: '/pc/details',    meta: {      keepAlive: false,    },    name: 'PCDetails',    component: () => import('@/views/PC/details/index.vue'),  },  // 通用列表  {    path: '/pc/generalList',    meta: {      keepAlive: false,    },    name: 'GeneralList',    component: () => import('@/views/PC/generalList/index.vue'),  },]// 抛出模块export default PCRouter