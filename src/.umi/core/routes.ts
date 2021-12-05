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
        "path": "/hotInfo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotInfo' */'/Users/lzy/myproject/UmiForCode/src/pages/hotInfo')}),
        "name": "热点资讯",
        "title": "程序员成长榨汁机 - 热点资讯",
        "icon": "hotInfo",
        "access": "/hotInfo",
        "exact": true
      },
      {
        "path": "/overview",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__overview' */'/Users/lzy/myproject/UmiForCode/src/pages/overview')}),
        "name": "个人数据",
        "title": "程序员成长榨汁机 - 个人数据",
        "icon": "overview",
        "access": "/overview",
        "exact": true
      },
      {
        "path": "/task",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task' */'/Users/lzy/myproject/UmiForCode/src/pages/task')}),
        "name": "任务计划",
        "title": "程序员成长榨汁机 - 任务计划",
        "icon": "task",
        "access": "/task",
        "routes": [
          {
            "path": "/",
            "redirect": "/task/task/task-plan",
            "exact": true
          },
          {
            "path": "/task/task-plan",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task__TaskPlan' */'/Users/lzy/myproject/UmiForCode/src/pages/task/TaskPlan')}),
            "name": "今日计划",
            "title": "程序员成长榨汁机 - 今日计划",
            "icon": "",
            "access": "/task/task-plan",
            "exact": true
          },
          {
            "path": "/task/task-history",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task__TaskHistory' */'/Users/lzy/myproject/UmiForCode/src/pages/task/TaskHistory')}),
            "name": "历史",
            "title": "程序员成长榨汁机 - 历史",
            "icon": "",
            "access": "/task/task-history",
            "exact": true
          }
        ]
      },
      {
        "path": "/hotel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel')}),
        "name": "客栈",
        "title": "程序员成长榨汁机 - 客栈",
        "icon": "hotel",
        "access": "/hotel",
        "routes": [
          {
            "path": "/",
            "redirect": "/hotel/hotel/hotel-board",
            "exact": true
          },
          {
            "path": "/hotel/hotel-board",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel__HotelBoard' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelBoard')}),
            "name": "排行榜",
            "title": "程序员成长榨汁机 - 排行榜",
            "icon": "",
            "access": "/hotel/hotel-board",
            "exact": true
          },
          {
            "path": "/hotel/hotel-studyguide",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel__HotelStudyGuide' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelStudyGuide')}),
            "name": "学习指南",
            "title": "程序员成长榨汁机 - 学习指南",
            "icon": "",
            "access": "/hotel/hotel-studyguide",
            "exact": true
          },
          {
            "path": "/hotel/hotel-studyroad",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel__HotelStudyRoad' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelStudyRoad')}),
            "name": "学习路线",
            "title": "程序员成长榨汁机 - 学习路线",
            "icon": "",
            "access": "/hotel/hotel-studyroad",
            "exact": true
          }
        ]
      },
      {
        "path": "/other",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
        "name": "其他",
        "title": "程序员成长榨汁机 - 其他",
        "icon": "other",
        "access": "/other",
        "routes": [
          {
            "path": "/",
            "redirect": "/other",
            "exact": true
          },
          {
            "path": "/other1",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
            "name": "暂未开放",
            "title": "程序员成长榨汁机 - 暂未开放",
            "icon": "",
            "access": "",
            "exact": true
          },
          {
            "path": "/other2",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
            "name": "暂未开放",
            "title": "程序员成长榨汁机 - 暂未开放",
            "icon": "",
            "access": "",
            "exact": true
          }
        ]
      },
      {
        "path": "/setting",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__setting' */'/Users/lzy/myproject/UmiForCode/src/pages/setting')}),
        "name": "设置",
        "title": "程序员成长榨汁机 - 设置",
        "icon": "setting",
        "access": "/setting",
        "routes": [
          {
            "path": "/setting/personal-settings",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__setting__PersonalSetting' */'/Users/lzy/myproject/UmiForCode/src/pages/setting/PersonalSetting')}),
            "name": "个人设置",
            "title": "程序员成长榨汁机 - 个人设置",
            "icon": "",
            "access": "setting/personal-settings",
            "exact": true
          },
          {
            "path": "/setting/theme-setting",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__setting__ThemeSetting' */'/Users/lzy/myproject/UmiForCode/src/pages/setting/ThemeSetting')}),
            "name": "主题设置",
            "title": "程序员成长榨汁机 - 主题设置",
            "icon": "",
            "access": "setting/theme-setting",
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
