/**
 * src目录下的可以直接写
 * src/pages目录下可以直接写
 * src/components目录下的可以直接写
 */
const title = '程序员成长榨汁机 - '
export const pageRoutes = {
  path: '/',
  component: '@/layouts',
  routes: [
    { path: '/', redirect: '/overview' },
    {
      path: '/hotInfo',
      component: 'hotInfo',
      name: '热点资讯',
      title: title + '热点资讯',
      icon: 'hotInfo',
      access: '/hotInfo'
    },
    {
      path: '/overview',
      component: 'overview',
      name: '个人数据',
      title: title + '个人数据',
      icon: 'overview',
      access: '/overview'
    },
    {
      path: '/task',
      component: 'task',
      name: '任务计划',
      title: title + '任务计划',
      icon: 'task',
      access: '/task',
      routes: [
        { path: '/', redirect: 'task/task-plan' },
        {
          path: '/task/task-plan',
          component: 'task/TaskPlan',
          name: '今日计划',
          title: title + '今日计划',
          icon: '',
          access: '/task/task-plan'
        },
        {
          path: '/task/task-history',
          component: 'task/TaskHistory',
          name: '历史',
          title: title + '历史',
          icon: '',
          access: '/task/task-history'
        }
      ]
    },
    {
      path: '/hotel',
      component: 'hotel',
      name: '客栈',
      title: title + '客栈',
      icon: 'hotel',
      access: '/hotel',
      routes: [
        { path: '/', redirect: 'hotel/hotel-board' },
        {
          path: '/hotel/hotel-board',
          component: 'hotel/HotelBoard',
          name: '排行榜',
          title: title + '排行榜',
          icon: '',
          access: '/hotel/hotel-board'
        },
        {
          path: '/hotel/hotel-studyguide',
          component: 'hotel/HotelStudyGuide',
          name: '学习指南',
          title: title + '学习指南',
          icon: '',
          access: '/hotel/hotel-studyguide'
        },
        {
          path: '/hotel/hotel-studyroad',
          component: 'hotel/HotelStudyRoad',
          name: '学习路线',
          title: title + '学习路线',
          icon: '',
          access: '/hotel/hotel-studyroad'
        }
      ]
    },
    {
      path: '/other',
      component: 'other',
      name: '其他',
      title: title + '其他',
      icon: 'other',
      access: '/other',
      routes: [
        { path: '/', redirect: '/other' },
        {
          path: '/other1',
          component: 'other',
          name: '暂未开放',
          title: title + '暂未开放',
          icon: '',
          access: ''
        },
        {
          path: '/other2',
          component: 'other',
          name: '暂未开放',
          title: title + '暂未开放',
          icon: '',
          access: ''
        }
      ]
    },
    {
      path: '/setting',
      component: 'setting',
      name: '设置',
      title: title + '设置',
      icon: 'setting',
      access: '/setting',
      routes: [
        {
          path: '/setting/personal-settings',
          component: 'setting/PersonalSetting',
          name: '个人设置',
          title: title + '个人设置',
          icon: '',
          access: 'setting/personal-settings'
        },
        {
          path: '/setting/theme-setting',
          component: 'setting/ThemeSetting',
          name: '主题设置',
          title: title + '主题设置',
          icon: '',
          access: 'setting/theme-setting'
        }
      ]
    }
  ]
}

const route = [{ path: '/login', component: './login' }, { ...pageRoutes }]

export default route
