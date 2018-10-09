import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/article',
    name: '文章模块',
    meta: {title: '文章模块', icon: 'tree'},
    children: [
      {
        path: 'article',
        name: '文章',
        component: _import('article/article'),
        meta: {title: '文章', icon: 'example'},
        menu: 'article'
      },

    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/',
    name: '个人考勤',
    meta: {title: '个人考勤', icon: 'tree'},
    children: [
      {
        path: '',
        name: '个人申请',
        component: _import('attendance/attendance'),
        meta: {title: '个人申请', icon: 'example'},
        menu: 'attendance'
      },
      {
        path: 'myRecord',
        name: '日志查询',
        component: _import('attendance/myRecord'),
        meta: {title: '日志查询', icon: 'example'},
        menu: 'attendance'
      },
      {
        path: 'myRetroactive',
        name: '补签申请',
        component: _import('attendance/myRetroactive'),
        meta: {title: '补签申请', icon: 'example'},
        menu: 'attendance'
      },
      {
        path: 'sigin',
        name: '打卡签到',
        component: _import('attendance/sigin'),
        meta: {title: '打卡签到', icon: 'example'},
        menu: 'attendance'
      },



    ]
  },
  {
    path: '/deal',
    component: Layout,
    redirect: '/deal/',
    name: '考勤处理',
    meta: {title: '考勤处理', icon: 'tree'},
    children: [
      {
        path: '',
        name: '考勤处理',
        component: _import('deal/dealWith'),
        meta: {title: '考勤处理', icon: 'example'},
        menu: 'attendance'
      },
      {
        path: 'DealRetroactive',
        name: '处理补签',
        component: _import('deal/DealRetroactive'),
        meta: {title: '处理补签', icon: 'example'},
        menu: 'attendance'
      },


    ]
  },






  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户权限', icon: 'table'},
    children: [
      {
        path: '', name: '用户列表', component: _import('user/user'), meta: {title: '用户列表', icon: 'user'}, menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
