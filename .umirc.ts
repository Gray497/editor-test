// @ts-ignore
import { defineConfig } from 'umi/lib/defineConfig';
import {resolve} from "path";
let BundleAnalyzerPlugin = require("umi-webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
    components: resolve(__dirname, "./src/components"),
    utils: resolve(__dirname, "./src/utils"),
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
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
})

