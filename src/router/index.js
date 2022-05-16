import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'



/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * hidden: true                   如果设置为true,项目栏将不会显示在侧边栏(默认为false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 路由分为三种,常量路由(比如首页),异步路由(不同用户不同路由,根据权限来定的),任意路由(比如404)
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      //侧边栏显示的文字和图标及面包屑当中显示
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },


]

//异步路由
export const asyncRoutes = [{
    path: "/product",
    name: "Product",
    //首先得显示一级路由组件
    component: Layout,
    meta: {
      title: "商品管理",
      icon: 'el-icon-s-shop'
    },
    //默认的二级路由
    redirect: "/product/trademark/list",
    children: [
      //重定向等同于
      // {
      //   path:"",
      //   redirect:"/product/trademark/list"
      // },
      {
        path: 'trademark/list',
        name: "Trademark",
        component: () => import("@/views/product/trademark/List.vue"),
        //用于在侧边栏和面包屑当中显示
        meta: {
          title: "品牌管理"
        }
      },
      {
        path: 'attr/list',
        name: "Attr",
        component: () => import("@/views/product/attr/List.vue"),
        //用于在侧边栏和面包屑当中显示
        meta: {
          title: "平台属性管理"
        }
      },
      {
        path: "spu/list",
        name: "Spu",
        component: () => import("@/views/product/spu/List.vue"),
        meta: {
          title: "SPU管理"
        }
      },
      {
        path: "sku/list",
        name: "Sku",
        component: () => import("@/views/product/sku/List.vue"),
        meta: {
          title: "SKU管理"
        }
      },
    ]
  },
  //权限管理 
  {
    path: '/acl',
    component: Layout,
    name: 'Acl',
    redirect: 'acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-s-tools'
    },
    children: [{
        path: 'user/list',
        component: () =>
          import('@/views/acl/user/list'),
        name: 'User',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role/list',
        component: () =>
          import('@/views/acl/role/list'),
        name: 'Role',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'role/auth/:id',
        component: () =>
          import('@/views/acl/role/roleAuth'),
        name: 'RoleAuth',
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权'
        },
        hidden: true,
      },
      {
        path: 'permission/list',
        component: () =>
          import('@/views/acl/permission/list'),
        name: 'Permission',
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
]

//任意路由
export const anyRoutes = [
  // 404 page must be placed at the end !!!(404页面必须被放置在末尾)
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
