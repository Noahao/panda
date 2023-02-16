const H5Router = [
  {
    path: '/h5',
    meta: {
      title: '��ҳ',
      keepAlive: false,
    },
    name: 'H5home',
    component: () => import('@/views/H5/index/index.vue'),
  },
  {
    path: '/h5/baseDynamic',
    meta: {
      title: '���ض�̬',
      keepAlive: false,
    },
    name: 'BaseDynamic',
    component: () => import('@/views/H5/baseDynamic/index.vue'),
  },
  // �б�
  {
    path: '/h5/baseDynamic/list',
    meta: {
      title: '���ض�̬',
      keepAlive: false,
    },
    name: 'BaseDynamicList',
    component: () => import('@/views/H5/baseDynamicList/index.vue'),
  },
  {
    path: '/h5/touristService',
    meta: {
      title: '�οͷ���',
      keepAlive: false,
    },
    name: 'TouristService',
    component: () => import('@/views/H5/touristService/index.vue'),
  },
  {
    path: '/h5/research',
    meta: {
      title: '���б���',
      keepAlive: false,
    },
    name: 'Research',
    component: () => import('@/views/H5/research/index.vue'),
  },
  {
    path: '/h5/animal',
    meta: {
      title: '����֮��',
      keepAlive: false,
    },
    name: 'AnimalHome',
    component: () => import('@/views/H5/animal/index.vue'),
  },
  {
    path: '/h5/education',
    meta: {
      title: '���ս���',
      keepAlive: false,
    },
    name: 'EducationHome',
    component: () => import('@/views/H5/education/index.vue'),
  },
  {
    path: '/h5/education/list',
    meta: {
      title: '���ս���',
      keepAlive: true,
    },
    name: 'EducationHomeList',
    component: () => import('@/views/H5/educationList/index.vue'),
  },
  {
    path: '/h5/pandaCulture',
    meta: {
      title: '��è�Ļ�',
      keepAlive: false,
    },
    name: 'PandaCulture',
    component: () => import('@/views/H5/pandaCulture/index.vue'),
  },
  // �б�
  // {
  //   path: '/h5/pandaCulture/list',
  //   meta: {
  //     title: '��è�Ļ�',
  //   },
  //   name: 'pandaCultureList',
  //   component: () => import('@/views/H5/pandaCultureList/index.vue'),
  // },
  {
    path: '/h5/cooperation',
    meta: {
      title: '�������',
      keepAlive: false,
    },
    name: 'Cooperation',
    component: () => import('@/views/H5/cooperation/index.vue'),
  },
  {
    path: '/h5/partyWork',
    meta: {
      title: '��������',
      keepAlive: false,
    },
    name: 'PartyWork',
    component: () => import('@/views/H5/partyWork/index.vue'),
  },
  {
    path: '/h5/partyWork/list',
    meta: {
      title: '��������',
      keepAlive: true,
    },
    name: 'PartyWorkLits',
    component: () => import('@/views/H5/partyWork/list.vue'),
  },
  {
    path: '/h5/pandaValley',
    meta: {
      title: '��è��',
      keepAlive: false,
    },
    name: 'PandaValley',
    component: () => import('@/views/H5/pandaValley/index.vue'),
  },
  {
    path: '/h5/support',
    meta: {
      title: '����֧��',
      keepAlive: false,
    },
    name: 'Support',
    component: () => import('@/views/H5/support/index.vue'),
  },
  {
    path: '/h5/about',
    meta: {
      title: '��������',
      keepAlive: false,
    },
    name: 'About',
    component: () => import('@/views/H5/about/index.vue'),
  },
  // ͨ������ҳ
  {
    path: '/h5/details',
    meta: {
      title: '����',
      keepAlive: false,
    },
    name: 'Details',
    component: () => import('@/views/H5/details/index.vue'),
  },
  // ͨ���б�
  {
    path: '/h5/generalList',
    meta: {
      title: '�б�',
      keepAlive: false,
    },
    name: 'GeneralList',
    component: () => import('@/views/H5/generalList/index.vue'),
  },
]
// �׳�ģ��
export default H5Router
