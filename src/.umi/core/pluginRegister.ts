// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '/Users/lzy/myproject/UmiForCode/src/app.ts';
import * as Plugin_1 from '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-antd/runtime.tsx';
import * as Plugin_2 from '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-dva/runtime.tsx';
import * as Plugin_3 from '../plugin-initial-state/runtime';
import * as Plugin_4 from '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_5 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: '/Users/lzy/myproject/UmiForCode/src/app.ts',
  });
  plugin.register({
    apply: Plugin_1,
    path: '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-antd/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-dva/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_3,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_4,
    path: '/Users/lzy/myproject/UmiForCode/src/.umi/plugin-locale/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_5,
    path: '../plugin-model/runtime',
  });

export const __mfsu = 1;
