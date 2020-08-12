// @ts-ignore
import { defineConfig } from 'umi/lib/defineConfig';
import { resolve } from 'path';

// let BundleAnalyzerPlugin = require('umi-webpack-bundle-analyzer').BundleAnalyzerPlugin;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // locale: {
  //   // default zh-CN
  //   // default: 'zh-CN',
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   antd: true,
  //   baseNavigator: true,
  // },
  alias: {
    // !!! 按字母排序
    components: resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/utils'),
  },
  targets: {
    ie: 11,
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
    publicPath: '/',
  },
  // chainWebpack(config, { webpack }) {
  //   config
  //     .plugin("umi-webpack-bundle-analyzer")
  //     .use(new BundleAnalyzerPlugin());
  // },
  routes: [
    {
      path: '/',
      component: '../pages/index'
    },
    {
      path: '/admin',
      component: '../layouts/index',
      routes: [
        { path: '/admin/articles/:articleType', component: '../pages/articles/articleType' },
        { path: '/admin/groups', component: '../pages/groups' },
        { path: '/admin/dashboard', component: '../pages/dashboard' },
      ],
    },
    {
      path: '/www',
      component: '../pages/www',
      routes: [
        { path: '/www/dashboard', component: '../pages/www/dashboard' },
        { path: '/www/articles/:articleType', component: '../pages/www/articles/articleType' },
        { path: '/www/articles', component: '../pages/www/articles/articleType' },
        { path: '/www/groups/:articleType', component: '../pages/www/groups/articleType' },
        { path: '/www/articleDetail', component: '../pages/www/articleDetail' },
      ]
    },

  ],
});

