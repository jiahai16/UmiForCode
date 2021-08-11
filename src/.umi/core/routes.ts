// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/lzy/myproject/UmiForCode/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login' */'/Users/lzy/myproject/UmiForCode/src/pages/login')}),
    "exact": true
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts' */'@/layouts')}),
    "routes": [
      {
        "path": "/",
        "redirect": "/overview",
        "exact": true
      },
      {
        "path": "/overview",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__overview' */'/Users/lzy/myproject/UmiForCode/src/pages/overview')}),
        "title": "总览",
        "icon": "",
        "access": "/overview",
        "exact": true
      },
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user' */'/Users/lzy/myproject/UmiForCode/src/pages/user')}),
        "title": "用户",
        "icon": "",
        "access": "/user",
        "routes": [
          {
            "path": "/",
            "redirect": "/user/user-management",
            "exact": true
          },
          {
            "path": "/user/role-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__RoleManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/user/RoleManagement')}),
            "title": "角色管理",
            "icon": "",
            "access": "/user/role-management",
            "exact": true
          },
          {
            "path": "/user/user-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__UserManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/user/UserManagement')}),
            "title": "用户管理",
            "icon": "",
            "access": "/user/user-management",
            "exact": true
          }
        ]
      },
      {
        "path": "/creator",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__creator' */'/Users/lzy/myproject/UmiForCode/src/pages/creator')}),
        "title": "Creator",
        "icon": "",
        "access": "/creator",
        "exact": true
      },
      {
        "path": "/procedure",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__procedure' */'/Users/lzy/myproject/UmiForCode/src/pages/procedure')}),
        "title": "流程",
        "icon": "",
        "access": "/procedure",
        "routes": [
          {
            "path": "/",
            "redirect": "/procedure/procedure-management",
            "exact": true
          },
          {
            "path": "/procedure/procedure-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__procedure__ProcedureManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/procedure/ProcedureManagement')}),
            "title": "流程管理",
            "icon": "",
            "access": "/procedure/procedure-management",
            "exact": true
          },
          {
            "path": "/procedure/process-package-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__procedure__ProcessPackageManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/procedure/ProcessPackageManagement')}),
            "title": "流程包管理",
            "icon": "",
            "access": "/procedure/process-package-management",
            "exact": true
          }
        ]
      },
      {
        "path": "/task",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task' */'/Users/lzy/myproject/UmiForCode/src/pages/task')}),
        "title": "任务",
        "icon": "",
        "access": "/task",
        "routes": [
          {
            "path": "/",
            "redirect": "/task/task-management",
            "exact": true
          },
          {
            "path": "/task/task-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task__TaskManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/task/TaskManagement')}),
            "title": "任务管理",
            "icon": "",
            "access": "/task/task-management",
            "exact": true
          },
          {
            "path": "/task/task-view",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task__TaskView' */'/Users/lzy/myproject/UmiForCode/src/pages/task/TaskView')}),
            "title": "任务视图",
            "icon": "",
            "access": "/task/task-view",
            "exact": true
          }
        ]
      },
      {
        "path": "/plan",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__plan' */'/Users/lzy/myproject/UmiForCode/src/pages/plan')}),
        "title": "计划",
        "icon": "",
        "access": "/plan",
        "routes": [
          {
            "path": "/",
            "redirect": "/plan/plan-management",
            "exact": true
          },
          {
            "path": "/plan/plan-management",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__plan__PlanManagement' */'/Users/lzy/myproject/UmiForCode/src/pages/plan/PlanManagement')}),
            "title": "计划管理",
            "icon": "",
            "access": "/plan/plan-management",
            "exact": true
          },
          {
            "path": "/plan/plan-calendar",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__plan__calendar' */'/Users/lzy/myproject/UmiForCode/src/pages/plan/calendar')}),
            "title": "计划日历",
            "icon": "",
            "access": "/plan/plan-calendar",
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
