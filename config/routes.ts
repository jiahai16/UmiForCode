/**
 * src目录下的可以直接写
 * src/pages目录下可以直接写
 * src/components目录下的可以直接写
 */

export const pageRoutes = {
  path: '/',
  component: '@/layouts',
  routes: [
    { path: '/', redirect: '/overview' },
    {
      path: '/overview',
      component: 'overview',
      title: '总览',
      icon: '',
      access: '/overview'
    },
    {
      path: '/user',
      component: 'user',
      title: '用户',
      icon: '',
      access: '/user',
      routes: [
        { path: '/', redirect: '/user/user-management' },
        {
          path: '/user/role-management',
          component: 'user/RoleManagement',
          title: '角色管理',
          icon: '',
          access: '/user/role-management'
        },
        {
          path: '/user/user-management',
          component: 'user/UserManagement',
          title: '用户管理',
          icon: '',
          access: '/user/user-management'
        }
      ]
    },
    {
      path: '/creator',
      component: 'creator',
      title: 'Creator',
      icon: '',
      access: '/creator'
    },
    {
      path: '/procedure',
      component: 'procedure',
      title: '流程',
      icon: '',
      access: '/procedure',
      routes: [
        { path: '/', redirect: '/procedure/procedure-management' },
        {
          path: '/procedure/procedure-management',
          component: 'procedure/ProcedureManagement',
          title: '流程管理',
          icon: '',
          access: '/procedure/procedure-management'
        },
        {
          path: '/procedure/process-package-management',
          component: 'procedure/ProcessPackageManagement',
          title: '流程包管理',
          icon: '',
          access: '/procedure/process-package-management'
        }
      ]
    },
    {
      path: '/task',
      component: 'task',
      title: '任务',
      icon: '',
      access: '/task',
      routes: [
        { path: '/', redirect: '/task/task-management' },
        {
          path: '/task/task-management',
          component: 'task/TaskManagement',
          title: '任务管理',
          icon: '',
          access: '/task/task-management'
        },
        {
          path: '/task/task-view',
          component: 'task/TaskView',
          title: '任务视图',
          icon: '',
          access: '/task/task-view'
        }
      ]
    },
    {
      path: '/plan',
      component: 'plan',
      title: '计划',
      icon: '',
      access: '/plan',
      routes: [
        { path: '/', redirect: '/plan/plan-management' },
        {
          path: '/plan/plan-management',
          component: 'plan/PlanManagement',
          title: '计划管理',
          icon: '',
          access: '/plan/plan-management'
        },
        {
          path: '/plan/plan-calendar',
          component: 'plan/calendar',
          title: '计划日历',
          icon: '',
          access: '/plan/plan-calendar'
        }
      ]
    }
  ]
}

const route = [
  { path: '/login', component: './login' },
  { ...pageRoutes }
]

export default route
