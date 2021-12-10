import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title:"master",
    layout:"top"
  },
  proxy:proxy,
  routes:routes,
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'vue-app', // 唯一 id
          entry: '//localhost:7002', // html entry
        },
        {
          name: 'react-app', // 唯一 id
          entry: '//localhost:7001', // html entry
        }
      ],
    },
  },
});
