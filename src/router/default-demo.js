export default [
  {
    path: '/default-demo',
    component: () => import('@/views/default-demo/index.vue')
  },
  {
    path: '/default-demo/demo',
    component: () => import('@/views/default-demo/layout.vue'),
    children: [
      {
        path: '/default-demo/demo/echarts',
        component: () => import('@/views/default-demo/echarts/index.vue')
      },
      // {
      //   path: '/default-demo/demo/mapbox-gl',
      //   component: () => import('@/views/default-demo/mapbox-gl/index.vue'),
      //   meta: {
      //     full: true
      //   }
      // },
      {
        path: '/default-demo/demo/request',
        component: () => import('@/views/default-demo/request/index.vue')
      },
      {
        path: '/default-demo/demo/icon',
        component: () => import('@/views/default-demo/icon/index.vue')
      },
      {
        path: '/default-demo/demo/loading',
        component: () => import('@/views/default-demo/loading/index.vue')
      }
    ]
  },
  {
    path: '/default-components',
    component: () => import('@/views/default-demo/components-show/index.vue')
  }
];
