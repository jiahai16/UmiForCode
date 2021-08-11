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
        "title": "个人数据",
        "icon": "",
        "access": "/overview",
        "exact": true
      },
      {
        "path": "/task",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task' */'/Users/lzy/myproject/UmiForCode/src/pages/task')}),
        "title": "任务计划",
        "icon": "",
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
            "title": "今日计划",
            "icon": "",
            "access": "/task/task-plan",
            "exact": true
          },
          {
            "path": "/task/task-history",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__task__TaskHistory' */'/Users/lzy/myproject/UmiForCode/src/pages/task/TaskHistory')}),
            "title": "历史",
            "icon": "",
            "access": "/task/task-history",
            "exact": true
          }
        ]
      },
      {
        "path": "/hotel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel')}),
        "title": "客栈",
        "icon": "",
        "access": "/hotel",
        "routes": [
          {
            "path": "/",
            "redirect": "/hotel/hotel-board",
            "exact": true
          },
          {
            "path": "/hotel/hotel-board",
            "component": dynamic({ loader: () => import(/* webpackChunkName: '__hotel__HotelBoard' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelBoard')}),
            "title": "排行榜",
            "icon": "",
            "access": "/hotel/hotel-board",
            "exact": true
          },
          {
            "path": "/hotel/hotel-studyguide",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel__HotelStudyGuide' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelStudyGuide')}),
            "title": "学习指南",
            "icon": "",
            "access": "/hotel/hotel-studyguide",
            "exact": true
          },
          {
            "path": "/hotel/hotel-studyroad",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__hotel__HotelStudyRoad' */'/Users/lzy/myproject/UmiForCode/src/pages/hotel/HotelStudyRoad')}),
            "title": "学习路线",
            "icon": "",
            "access": "/hotel/hotel-studyroad",
            "exact": true
          }
        ]
      },
      {
        "path": "/other",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
        "title": "其他",
        "icon": "",
        "access": "/other",
        "routes": [
          {
            "path": "/",
            "redirect": "/other",
            "exact": true
          },
          {
            "path": "/other",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
            "title": "暂未开放",
            "icon": "",
            "access": "",
            "exact": true
          },
          {
            "path": "/other",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__other' */'/Users/lzy/myproject/UmiForCode/src/pages/other')}),
            "title": "暂未开放",
            "icon": "",
            "access": "",
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
